
import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";

import * as request from "request-promise";

import { MCounter } from "./counterparty.model";


@Component()
export class CounterpartyService {
    public options = {
        uri: "https://online.moysklad.ru/api/remap/1.1/entity/counterparty",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic  YWRtaW5Aa2FsaW5vZmZza2kxOjA1NGFmMjkwNTU="
        }
    };
    constructor() { }

    public async getAll() {
        let counters = JSON.parse(await request(this.options));
        return _.map(counters.rows, counter => _.pick(counter, ["name", "description", "created", "companyType", "email"]));
    }

}