import * as _ from "lodash";
import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Post, Req, Res, Query } from "@nestjs/common";

import { Setting } from "./setting.entity";
import { SettingService } from "./setting.service";


@Controller("setting")
export class SettingController {

    constructor(
        protected _settingService: SettingService
    ) { }

    @Get("get")
    public async getOnly( @Req() req: Request, @Res() res: Response, @Query() query?: any) {
        let 