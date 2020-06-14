
import * as _ from "lodash";
import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Post, Query, Res, Req } from "@nestjs/common";
import * as bluebird from "bluebird";

import { ProductService } from "./product.service";
import { IProduct, IPosition, IStockEntity } from "./product.interface";
import { SettingService } from "../setting/setting.service";
import { UserService } from "../user/user.service";


@Controller("product")
export class ProductController {

    constructor(
        private _productService: ProductService,
        private _settingService: SettingService,
        private _userService: UserService
    ) { }

    @Post()
    public async getProductsById( @Req() req: Request, @Res() res: Response, @Body() products: Array<IProduct>) {
        let productsStr: string = this.getStrProductsId(products);
        let token = req["token"];
        let productsStock: IStockEntity[] = await this._productService.getProductsById(productsStr);
        products = this.convertProducts(productsStock);
        products = await this.convertToCurrency(products, token);
        products = await this.loadDesc(products);
        products = await this.loadImages(products);
        products = await this.addPositionsFromProduct(products);
        res.status(HttpStatus.OK).json(products);
    }

    @Get()
    public async getStockAllProduct( @Req() req: Request, @Res() res: Response, @Query() query?: any) {
        let limit: number = +query.limit || 0;
        let offset: number = +query.offset || 0;
        let search: string = query.search && query.search + "" || null;
        let token = req["token"];
        // Получаем все товары с указанным ограничением
        // limit = ограничение
        // offet = смещение, новое смещение необходимо будет вернуть на front
        let loadAll: boolean = false; // Признак того что загружены все товары
        let productsStock: IStockEntity[] = [];
        let folderId = await this._settingService.getOnly("folderId");
        while (productsStock.length < limit) {
            let loaderProductsStock: IStockEntity[] = await this.loadProduct(limit, offset, search, folderId && folderId.value || null);
            if (loaderProductsStock.length == 0) {
                loadAll = true;
                break;
            }
            productsStock.push(..._.filter(loaderProductsStock, (o) => o.quantity > 0));
            if (productsStock.length < limit) {
                offset += limit;
            }
        }
        let products: IProduct[] = this.convertProducts(productsStock);
        products = await this.convertToCurrency(products, token);
        products = await this.loadDesc(products);
        products = await this.loadImages(products);
        products = await this.addPositionsFromProduct(products);
        products = _.each(products, (o) => { _.filter(o.positions, (v) => v.quantity > 0); });
        res.status(HttpStatus.OK).json({ offset: offset, products: products });
    }

    private async convertToCurrency(products: IProduct[], token) {
        let currencyStock: any;
        if (!token.isAdmin) {
            let user = await this._userService.getById(token.id);
            if (user.currencyId) {
                currencyStock = await this._productService.getCurrencyById(user.currencyId);
            } else {
                currencyStock = await this._productService.getDefaultCurrency();
            }
        } else {
            currencyStock = await this._productService.getDefaultCurrency();
        }
        _.each(products, function (product) {
            product.codeCurrency = currencyStock.name;
            product.salePrice = (product.salePrice / 100) * currencyStock.rate;
        });
        return products;
    }

    private async loadProduct(limit, offset, search, folderId): Promise<IStockEntity[]> {
        return await this._productService.getStockAllProduct(limit, offset, search, folderId);
    }

    private loadDesc(products: IProduct[]) {
        let _productService = this._productService;
        return bluebird.Promise.map(products, function (product) {
            return _productService.loadDesc(product);
        }).then(function (result) {
            return result;
        });
    }

    private loadImages(products: IProduct[]) {
        let _productService = this._productService;
        return bluebird.Promise.map(products, function (product) {
            return _productService.loadImage(product);
        }).then(function (result) {
            return result;
        });
    }

    private convertProducts(productsStock: IStockEntity[]) {
        let products: IProduct[] = [];
        _.each(productsStock, function (productStock) {
            let product: IProduct = {
                id: _.split(_.last(_.split(productStock.meta.href, "/")), "?")[0],
                name: productStock.name,
                image: productStock.image && productStock.image.miniature.href || null,
                article: productStock.article,
                stock: 0,
                quantityStock: productStock.quantity,
                salePrice: productStock.salePrice,
                positions: []
            };
            products.push(product);
        });
        return products;
    }

    private async addPositionsFromProduct(products: IProduct[]) {
        let arrStrProductsId: string[] = this.getArrStrProductsId(products);
        let positionsArrStock: Array<IStockEntity[]> = await this.loadPositions(arrStrProductsId);
        _.each(positionsArrStock, function (positionsStock) {
            _.each(_.filter(positionsStock, (o) => o.quantity > 0), function (positionStock) {
                let productNow: IProduct = _.find(products, function (product) {
                    return product.article === positionStock.article;
                });
                productNow.stock += positionStock.quantity;
                productNow.positions.push({
                    id: _.split(_.last(_.split(positionStock.meta.href, "/")), "?")[0],
                    stock: positionStock.quantity,
                    salePrice: positionStock.salePrice,
                    size: +positionStock.name.match(/\(([^\]]+)\)/ig).map(n => n.slice(1, -1))[0],
                    quantity: 0
                });
            });
        });
        return products;
    }

    private loadPositions(arrStrProductsId: string[]) {
        let _productService = this._productService;
        return bluebird.Promise.map(arrStrProductsId, function (str) {
            return _productService.getStockAllVariants(str);
        }).then(function (result) {
            return result;
        });
    }

    private getArrStrProductsId(products: IProduct[]): string[] {
        let str: string[] = [];
        let strTmp: string = "";
        _.each(products, function (product, key) {
            strTmp += "&product.id=" + product.id;
            if ((key + 1) % 5 === 0 || (key + 1) === products.length) {
                str.push(strTmp);
                strTmp = "";
            }

        });
        return str;
    }

    private getStrProductsId(products: IProduct[]): string {
        let str: string = "";
        _.each(products, function (product) {
            str += "&product.id=" + product.id;
        });
        return str;
    }
