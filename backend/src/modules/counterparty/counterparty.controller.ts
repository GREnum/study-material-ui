import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Res } from "@nestjs/common";

import { CounterpartyService } from "./counterparty.service";


@Controller("counterparty")
export class C