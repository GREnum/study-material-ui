import * as path from "path";
import { Component } from "@nestjs/common";
import { ConnectionOptions } from "typeorm";

import { User } from "../user/user.entity";
import { Setting } from "../setting/setting.entity";
import { DatabaseConfig } from "./database.config";


@Component()
export class DevDatabaseConfig extends DatabaseConfig {
    public getConfiguration(): ConnectionOptions {
        consol