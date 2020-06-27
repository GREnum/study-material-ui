import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";
import * as request from "request-promise";

import { IProduct } from "./product.interface";
import { CommonService } from "../../common/common.service";

@Component()
export class ProductService {

    constructor(
        private _commonServise: CommonService
    ) { }

    public async loadDesc(product: IProduct) {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        options.uri += "/entity/product/" + product.id;
        let newProduct: IProduct = JSON.parse(await request(options));
        product.description = newProduct.description || null;
        return product;
    }

    public async loadImage(product: IProduct) {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        if (!product.image) {
            return Promise