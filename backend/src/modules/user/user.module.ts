import { SettingService } from "../setting/setting.service";
import * as _ from "lodash";
import { Module, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";

import { UserService } from "./user.service";
import { CommonModule } from "../../common/common.module";
import { CommonService } from "../../common/common.service";
import { UserController } from "./user.controller";
import { DatabaseModule } from "../database/database.module";
import { LoggingMiddleware } from "../../middleware/logging.middleware";
import { AuthorizeMiddleware } from "../../middleware/authorize.middleware";


@Module({
    modules: [DatabaseModule, CommonModule],
    controllers: [UserController],
    components: [UserService, { provide: CommonService }],
    exports: [UserService]
})
export class UserModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthorizeMiddleware)
            .forRoutes(
            { path: "/user/register", method: RequestMethod.POST },
            { path: "/user/reload", method: RequestMethod.GET },
            { path: "/user/", method: RequestMethod.GET },
            { path: "/user/changepassword", method: RequestMethod.POST }
            )
            .apply(LoggingMiddleware)
            .forRoutes(UserController);
    }
}

