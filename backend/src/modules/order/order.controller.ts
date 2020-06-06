
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