import * as passport from "passport";
import { Middleware, NestMiddleware, Next } from "@nestjs/common";
import { ExtractJwt, StrategyOptions, Strategy as JwtStrategy } from "passport-jwt";


let opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("x-auth"),
    secretOrKey: "stockpapaya",
};

passport.use(new JwtStrategy(opts, function (jwtpayload, done) {
    console.log("passport.use!");
    done(null, jwtpayload);
}));

@Middleware()
export class AuthorizeMiddleware implements NestMiddleware {
    public resolve(): (req, res, next) => void {
        console.log("passport.authent