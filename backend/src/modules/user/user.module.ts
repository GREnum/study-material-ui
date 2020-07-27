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


@Modul