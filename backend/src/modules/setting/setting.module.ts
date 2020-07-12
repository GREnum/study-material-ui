import * as _ from "lodash";
import { Module, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { SettingService } from "./setting.service";
import { SettingController } from "./setting.controller";
import { AuthorizeMiddleware } from "../../middleware/authorize.middleware";
import { LoggingMiddleware } from "../../middleware/logging.middleware";


@Module({
    modules: [DatabaseModule],
    controllers: [SettingController],
    components: [SettingService],
    exports: [SettingService]
})
export class SettingModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(Autho