
import * as _ from "lodash";
import { Setting } from "../modules/setting/setting.entity";
import { Repository } from "typeorm";
import { Component, forwardRef, Inject } from "@nestjs/common";

import { SettingService } from "../modules/setting/setting.service";
import { DatabaseService } from "../modules/database/database.service";


export const OPTIONS = {
    method: "GET",
    uri: "https://online.moysklad.ru/api/remap/1.1",
    body: null,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic  YWRtaW5AcTIzMzE4NjY6NTc5YTQ1NGUyMg=="
    },
    followRedirect: true
};

export interface IOptions {
    method: string;
    uri: string;
    body: any;
    headers: any;
    followRedirect?: boolean;
}

@Component()
export class CommonService {

    private _options: IOptions;

    constructor(
        private readonly _settingService: SettingService
    ) { }

    public async getOptions(reload?: boolean): Promise<IOptions> {
        if (this._options && !reload) {
            return this._options;
        }
        let setting = await this._settingService.getSetting();
        let loginStock = _.find(setting, (o) => o.code === "loginStock").value;
        let passwordStock = _.find(setting, (o) => o.code === "passwordStock").value;
        const base64Auth = new Buffer(`${loginStock}:${passwordStock}`).toString("base64");
        this._options = {
            method: "GET",
            uri: "https://online.moysklad.ru/api/remap/1.1",
            body: null,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic  " + base64Auth
            },
            followRedirect: true
        };
        return this._options;
    }

}