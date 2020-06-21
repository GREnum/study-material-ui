import { MiddlewaresConsumer, Module } from "@nestjs/common";

import { CommonModule } from "../../common/common.module";
import { CommonService } from "../../common/common.service";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { LoggingMiddleware } from "../../middleware/logging.middleware";
import { AuthorizeMiddleware } from "../../middleware/authorize.middleware";
import { SettingModule } from "../setting/setting.module";
import { SettingService } from "../setting/setting.service";
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";


@Module({
    modules: [
        UserModule,
        SettingModule,
        CommonModule
    ],
    controllers: [ProductController],
    components: [
        ProductService,
        {
            provide: [
          