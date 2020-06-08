
import * as _ from "lodash";
import * as bluebird from "bluebird";
import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res } from "@nestjs/common";

import { OrderService } from "./order.service";
import { IOrder, IStockOrder } from "./order.interface";
import { IPosition, IProduct } from "../product/product.interface";
import { SettingService } from "../setting/setting.service";
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";


@Controller("order")
export class OrderController {

    constructor(
        private _orderService: OrderService,
        private _settingService: SettingService,
        private _userService: UserService
    ) { }

    @Get("get")
    public async getOrderById( @Req() req: Request, @Res() res: Response, @Query() query?: any) {
        let orderId = query.id;
        let positionsFromOrder: any = await this._orderService.getPositionsByOrder(orderId);
        let products: IProduct[] = [];
        let product: IProduct;
        let quantityItemOrder: number = 0;
        _.each(positionsFromOrder, function (positionFromOrder: any) {
            product = _.find(products, function (o) {
                return product.id == positionFromOrder.assortment.product.id;
            });
            if (!product) {
                product = {
                    id: positionFromOrder.assortment.product.id,
                    name: positionFromOrder.assortment.product.name,
                    image: positionFromOrder.assortment.product.image && positionFromOrder.assortment.product.image.miniature.href || null,
                    article: positionFromOrder.assortment.product.article,
                    salePrice: positionFromOrder.price / 100,
                    quantity: 0,
                    positions: []
                };
                products.push(product);
            }
            let position: IPosition = {
                id: positionFromOrder.assortment.id,
                salePrice: positionFromOrder.price / 100,
                size: +positionFromOrder.assortment.name.match(/\(([^\]]+)\)/ig).map(n => n.slice(1, -1))[0],
                quantity: positionFromOrder.quantity
            };
            product.quantity += positionFromOrder.quantity;
            product.positions.push(position);
            quantityItemOrder += positionFromOrder.quantity;
        });
        products = await this.loadImages(products);

        let orderStock: IStockOrder = await this._orderService.getOrderById(orderId);
        let order: IOrder = _.pick(orderStock, ["id", "name", "sum", "state", "updated", "created", "description"]);
        order.state = {
            name: orderStock.state.name,
            color: orderStock.state.color
        };
        order.sum = order.sum / 100;
        order.currencyCode = orderStock.rate.currency.name;
        order.quantity = quantityItemOrder;
        order.products = products;
        res.status(HttpStatus.OK).json(order);
    }

    @Get()
    public async getAll( @Req() req: Request, @Res() res: Response) {
        let agentId: string = req["token"].stockId || null;
        let stockOrders: IStockOrder[] = await this._orderService.getAll(agentId);
        console.log(stockOrders[0]);
        let orders: IOrder[] = [];
        _.each(stockOrders, function (stockOrder) {
            let order: IOrder = {
                id: stockOrder.id,
                name: stockOrder.name,
                sum: stockOrder.sum / 100,
                description: stockOrder.description || null,
                reservedSum: stockOrder.reservedSum,
                currencyCode: stockOrder.rate.currency.name,
                currencyId: _.last(_.split(stockOrder.rate.currency.meta.href, "/")),
                state: {
                    name: stockOrder.state.name,
                    color: stockOrder.state.color
                },
                created: stockOrder.created,
                updated: stockOrder.updated
            };
            orders.push(order);
        });
        res.status(HttpStatus.OK).json(orders);
    }

    @Post()
    public async createOrder( @Req() req: Request, @Res() res: Response, @Body() body: any) {
        let products: Array<IProduct> = body.products;
        let agentId = req["token"].stockId || null;
        if (req["token"].isAdmin) {
            agentId = body.agentId || null;
        }
        let user: User = await this._userService.getUserByStockId(agentId);
        let currencyId: string = user.currencyId;
        let organizationId = await this._orderService.getOrganizationId();
        let lastOrder = await this._orderService.getLastOrder();
        let descriptionOrder = await this._settingService.getOnly("orderComment");
        let lastOrderNum: number = 0;
        let newOrderNum: string;
        if (lastOrder.length) {
            lastOrderNum = +lastOrder[0].name + 1;
            newOrderNum = (Array(5).join("0") + lastOrderNum + "").slice(-5);
        }
        let newOrderBody = {
            "name": newOrderNum,
            "organization": {
                "meta": {
                    "href": "https://online.moysklad.ru/api/remap/1.1/entity/organization/" + organizationId,
                    "type": "organization",
                    "mediaType": "application/json"
                }
            },
            "agent": {
                "meta": {
                    "href": "https://online.moysklad.ru/api/remap/1.1/entity/counterparty/" + agentId,
                    "type": "counterparty",
                    "mediaType": "application/json"
                }
            },
            "rate": {
                "currency": {
                    "meta": {
                        "href": "https://online.moysklad.ru/api/remap/1.1/entity/currency/" + currencyId,
                        "metadataHref": "https://online.moysklad.ru/api/remap/1.1/entity/currency/metadata",
                        "type": "currency",
                        "mediaType": "application/json"
                    }
                }
            },
            "description": descriptionOrder && descriptionOrder.value || null,
            "positions": []
        };
        let currencyStock = await this._orderService.getCurrencyById(currencyId);
        _.each(products, function (product) {
            _.each(product.positions, function (position) {
                if (position.quantity > 0) {
                    let positionOrder = {
                        "quantity": position.quantity,
                        "price": req["token"].isAdmin ? product.salePrice * currencyStock.rate * 100 : product.salePrice * 100,
                        "assortment": {
                            "meta": {
                                "href": "https://online.moysklad.ru/api/remap/1.1/entity/variant/" + position.id,
                                "type": "variant",
                                "mediaType": "application/json"
                            }
                        },
                        "reserve": position.quantity
                    };
                    newOrderBody.positions.push(positionOrder);
                }
            });
        });
        let newOrder = await this._orderService.createOrder(newOrderBody);
        res.status(HttpStatus.OK).json({ "id": newOrder.id });
    }

    private loadImages(products: IProduct[]) {
        let _orderService = this._orderService;
        return bluebird.Promise.map(products, function (product) {
            return _orderService.loadImage(product);
        }).then(function (result) {
            return result;
        });
    }

}