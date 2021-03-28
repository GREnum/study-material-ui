import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from "@angular/router";

import { AuthService } from "../../_auth/auth.service";


@Injectable()
export class AllUsersResolverService implements Resolve<any> {

    constructor(
        private _route: ActivatedRoute,
        private _authService: AuthService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let users;
        if (this._authService.currentUser.user.isAdmin) {
            return this._authService.getAllUsers();
        } else {
            return Observable.of([{ "name": this._authService.currentUser.user.name }]);
        }
    }

}
