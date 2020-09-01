import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Inject, Injectable, Injector } from "@angular/core";
import { ToasterService } from "angular2-toaster";

import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";

import "rxjs/add/operator/do";


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(
        private _router: Router,
        private _injector: Injector,
        private _toasterServise: ToasterService
    ) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authService = this._injector.get(AuthService);
        let currentUser = authService.getStorageCurrentUser();
        const authReq = req.clone(
            {
                setHeaders: {
                    "Content-Type": "application/json",
                    "x-auth": currentUser && currentUser