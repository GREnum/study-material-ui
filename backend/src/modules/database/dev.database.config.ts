import * as path from "path";
import { Component } from "@nestjs/common";
import { ConnectionOptions } from "typeorm";

import { User } from "../user/user.entity";
import { Setting } from "../setting/setting.entity";
import { DatabaseConfig } from "./database.config";


@Component()
export class DevDatabaseConfig extends DatabaseConfig {
    public getConfiguration(): ConnectionOptions {
        console.log(1212);

        // // entities: [__dirname + "/entity/*"],
        return {
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "root",
            database: "papayastock",
            entities: [
                path.join(__dirname, "..", "**", "*{entity.js,entity.ts}")
            ],
            migrations: [
                path.join(__dirname, "..", "..", "migrations", "*{.js,.ts}")
            ],
            cli: {
                "migrationsDir": "migrations"
            },
            synchronize: true,
            logger: "advanced-console",
            logging: "all",
        };
    }
}
