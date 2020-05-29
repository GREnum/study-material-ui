
import * as moment from "moment";
import { Middleware, NestMiddleware } from "@nestjs/common";


@Middleware()
export class LoggingMiddleware implements NestMiddleware {
    public resolve(): (req, res, next) => void {
        return (req, res, next) => {
            console.log("**********************");
            console.log(moment().format("DD-MM-YYYY h:mm:ss:ms"), "Request...", req["originalUrl"]);
            console.log("**********************");
            next();
        };
    }
}