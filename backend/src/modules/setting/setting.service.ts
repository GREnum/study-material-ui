
import * as _ from "lodash";
import { EntityManager, Repository } from "typeorm";
import { Component, Inject, forwardRef } from "@nestjs/common";
import * as request from "request-promise";

import { Setting } from "./setting.entity";
import { DatabaseService } from "../database/database.service";
import { CommonService, IOptions } from "../../common/common.service";


@Component()
export class SettingService {

    constructor(
        private _databaseService: DatabaseService
    ) { }

    protected get repository(): Promise<Repository<Setting>> {
        return this._databaseService.getRepository(Setting);
    }

    protected get entityManager(): Promise<EntityManager> {
        return this._databaseService.getEntityManager();
    }

    public async getSetting(): Promise<Setting[]> {
        return (await this.repository).find({ select: ["id", "code", "value"] });
    }

    public async setSetting(settings: Setting[]): Promise<Setting[]> {
        return (await this.repository).save(settings);
    }

    public async getProductsFolder() {
        let options = _.cloneDeep(await this.getOptions());
        options.uri += "/entity/productfolder";
        return JSON.parse(await request(options)).rows;
    }

    public async getOptions(reload?: boolean): Promise<IOptions> {
        let setting = await this.getSetting();
        let loginStock = _.find(setting, (o) => o.code === "loginStock").value;
        let passwordStock = _.find(setting, (o) => o.code === "passwordStock").value;
        const base64Auth = new Buffer(`${loginStock}:${passwordStock}`).toString("base64");
        let options = {
            method: "GET",
            uri: "https://online.moysklad.ru/api/remap/1.1",
            body: null,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic  " + base64Auth
            },
            followRedirect: true
        };
        return options;
    }

    public async getOnly(settingCode: string): Promise<Setting> {
        return (await this.repository).findOne({ select: ["value"], where: { code: settingCode } });
    }

}