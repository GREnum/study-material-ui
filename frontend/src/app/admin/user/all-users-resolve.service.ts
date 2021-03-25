import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from "@angular/router";

import { AuthService } from "../../_auth/auth.service";


@Injectable()
export class AllUsersResolverService implements Resolve<any> {

    constructor(
        private _route: Act