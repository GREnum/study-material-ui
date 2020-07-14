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
export class UserCont