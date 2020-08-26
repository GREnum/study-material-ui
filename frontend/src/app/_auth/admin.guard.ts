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

    public canActivate(route: ActivatedRouteSnaps