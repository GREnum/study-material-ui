
import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";
import * as request from "request-promise";

import { IProduct } from "../product/product.interface";
import { CommonService } from "../../common/common.service";


@Component()
export class OrderService {

    constructor(
        private _commonServise: CommonService
    ) { }

    public async loadImage(product: IProduct) {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        if (!product.image) {
            return Promise.resolve(product);
        }
        options.uri = product.image;
        options.followRedirect = false;
        return await request(options)
            .catch(err => {
                product.image = err.response.headers.location;
                return product;
            });
    }

    public async getOrderById(orderId: string) {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        options.uri += "/entity/customerorder/" + orderId + "?expand=state,rate.currency";
        console.log(options.uri);
        return JSON.parse(await request(options));
    }

    public async getPositionsByOrder(orderId: string) {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        options.uri += "/entity/customerorder/" + orderId + "/positions?expand=assortment.product";
        console.log(options.uri);
        return JSON.parse(await request(options)).rows;
    }

    public async getAll(agentId: string) {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        options.uri += "/entity/customerorder?order=created&direction=desc&expand=state,rate.currency";
        if (agentId) {
            options.uri += "&filter=agent=https://online.moysklad.ru/api/remap/1.1/entity/counterparty/" + agentId;
        }
        console.log(options.uri);
        return JSON.parse(await request(options)).rows;
    }

    public async getOrganizationId() {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        options.uri += "/entity/organization";
        let organization = JSON.parse(await request(options)).rows[0];

        return organization.id;
    }

    public async getLastOrder() {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        options.uri += "/entity/customerorder?order=created&direction=desc&limit=1";
        let lastOrder = JSON.parse(await request(options)).rows;

        return lastOrder;
    }

    public async createOrder(body) {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        options.uri += "/entity/customerorder";
        options.method = "POST";
        options.body = JSON.stringify(body);
        let newOrder = JSON.parse(await request(options));

        return newOrder;
    }

    public async getCurrencyById(id: string) {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        options.uri += "/entity/currency/" + id;
        return JSON.parse(await request(options));
    }
}