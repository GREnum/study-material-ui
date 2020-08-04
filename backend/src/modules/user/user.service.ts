import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";
import * as request from "request-promise";

import { User } from "./user.entity";
import { CommonService } from "../../common/common.service";
import { DatabaseService } from "../database/database.service";
import { NotFoundException } from "../../exception/not-found.exception";


@Component()
export class UserService {

    constructor(
        private _commonServise: CommonService,
        private _databaseService: DatabaseService
    ) { }

    protected get repository(): Promise<Repository<User>> {
        return this._databaseService.getRepository(User);
    }

    public async getAll(): Promise<User[]> {
        return (await this.repository).find({ select: ["id", "name", "stockId"] });
    }

    public async add(user: User): Promise<User> {
        return (await this.repository).save(user).catch(error => {
            throw new NotFoundException("Пользователь уже зарегистрирован в системе!");
        });
    }

    public async getByName(nameUser: string): Promise<User> {
        let user: User = await ((await