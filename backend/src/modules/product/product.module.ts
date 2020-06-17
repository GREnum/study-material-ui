import { MiddlewaresConsumer, Module } from "@nestjs/common";

import { CommonModule } from "../../common/common.module";
import { CommonService } from "../../common/common.service";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { LoggingMiddleware } from "../../middleware/logging.middleware