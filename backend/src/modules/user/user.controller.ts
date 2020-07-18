import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";

import { User } from "./user.entity";
import { UserService } from "./user.service";
import { NotFoundException } from "../../exception/not-found.exception";
import { BadRequestException } from "../../exception/bad-request.exceprion";
import { NotAcceptableException } from "../../exception/not-acceptable.exception";


@Controller("user")
export class UserController {

    constructor(
        protected _userService: UserService
    ) { }

    @Get()
    public async getAll( @Req() req: Request, @Res() res: Response) {
        let users: User[] = await this._userService.getAll();
        res.status(HttpStatus.OK).json(users);
    }

    @Get("currency")
    public async getAllCurrensy( @Req() req: Request, @Res() res: Response) {
        let currenciesStock: any = await this._userService.getAllCurrency();
        let currency: any[] = [];
        _.each(_.filter(currenciesStock, (o) => !o.archived), function (currencyStock) {
            currency.push({
                id: _.last(_.split(currencyStock.meta.href, "/")),
                name: currencyStock.name
            });
        });
        res.status(HttpStatus.OK).json(currency);
    }

    @Get("reload")
    public async reload( @Req() req: Request, @Res() res: Response) {
        res.status(HttpStatus.OK).json(_.pick(req["token"], ["name", "isAdmin"]));
    }

    @Post("register")
    public async create( 