
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private _authService: AuthService
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("Use AuthGuard");
        if (this._authService.isLoggedIn()) {
            console.log("--AuthGuard true");
            return true;
        }
        console.log("--AuthGuard false");
        this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });

        return false;
    }
}