import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Res } from "@nestjs/common";

import { CounterpartyService } from "./counterparty.service";


@Controller("counterparty")
export class CounterpartyController {
    constructor(private _counterService: CounterpartyService) {

    }

    @Get()
    public async getAll( @Res() res: Response, @Body() boies: any) {
        let counter = await this._counterService.getAll();
        res.status(HttpStatus.OK).json(counter);
    }
}
