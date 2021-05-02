import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { UserService } from "./user.service";


@Injectable()
export class CurrencyResolverService implements Resolve<any> {

    constructor(
        private __userService: UserService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.__use