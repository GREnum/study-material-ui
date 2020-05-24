import * as passport from "passport";
import { Middleware, NestMiddleware, Next } from "@nestjs/common";
import { ExtractJwt, StrategyOptions, Strategy as JwtStrategy } from "passport-jwt";


let opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("x-auth"),
    secretOrKey: "stockpapaya",
};

passport