import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";
import * as request from "request-promise";

import { IProduct } from "./product.interface";
import { CommonService } from "../../common/common.service";

@Component()
export class ProductService {

    constructor(
        private _commonServ