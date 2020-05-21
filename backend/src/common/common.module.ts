import { SettingService } from "../modules/setting/setting.service";

import { SettingModule } from "../modules/setting/setting.module";
import { Module, SingleScope } from "@nestjs/common";
import { CommonService } from "./common.service";

import { DatabaseModule } from "../modules/database/database.module";


@Module({
    modules: [SettingModule],
    compon