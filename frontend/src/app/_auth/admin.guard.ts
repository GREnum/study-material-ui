import { Injectable } from "@angular/core";
import { ToasterService } from "angular2-toaster";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { AuthService } from "./auth.service";


@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private router: Router,
        private _authService: AuthService,
        private _toasterServise: ToasterService
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._authService.isAdmin()) {
            return true;
        }

        this._toasterServise.pop("error", "Нет доступа к запрашиваемой странице", state.url);
        this.router.navigate(["admin", "products"]);
        this._toasterServise.pop("success", "Вы перенаправлены на наш каталог", "admin/products");

        return false;
    }

}
