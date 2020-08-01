import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";
import * as request from "request-promise";

import { User } from "./user.entity";
import { CommonService } from "../../common/common.service";
import { DatabaseService } from "../database/database.service";
import { NotFoundException } from "../../exception/not-found.exc