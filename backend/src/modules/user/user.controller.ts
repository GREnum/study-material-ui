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
    public async create( @Res() res: Response, @Body() user: User) {
        let usersStock: any[] = await this._userService.getStocksUserByEmail(user.name);
        if (usersStock.length === 0) {
            throw new NotFoundException(`Не найден пользователь с e-mail "${user.name}" в системе МойСклад!`);
        }
        if (usersStock.length > 1) {
            throw new NotFoundException(`Найдено несколько пользователей с e-mail "${user.name}" в системе МойСклад!`);
        }
        let newUser: User = user;
        newUser.stockId = usersStock[0].id;
        newUser.password = this.encryptPassword(newUser.password);
        let createdUser: User = await this._userService.add(newUser);
        res.status(HttpStatus.OK).json(createdUser);
    }

    @Post("changepassword")
    public async changePassword( @Req() req: Request, @Res() res: Response, @Body() regUser: any) {
        console.log(req["token"]);
        if (regUser.password !== regUser.confirmPassword) {
            throw new BadRequestException("Несовпадают пароли!");
        }
        let user: User = req["token"];
        if (req["token"].isAdmin) {
            user = await this._userService.getByName(regUser.name);
        }
        user.password = this.encryptPassword(regUser.password);
        user = await this._userService.add(user);
        res.status(HttpStatus.OK).json({ title: "Пароль успешно изменен", text: `у пользователя "${user.name}"` });
    }

    @Post("authenticate")
    public async login( @Res() res: Response, @Body() user: User) {
        let foundUser: User = await this._userService.getByName(user.name);
        if (foundUser.password !== this.encryptPassword(user.password)) {
            throw new NotFoundException("Incorrect password");
        }
        let authUser: Partial<User> = _.pick(foundUser, ["id", "name", "isAdmin", "stockId"]);
        let tokenLocale = jwt.sign(