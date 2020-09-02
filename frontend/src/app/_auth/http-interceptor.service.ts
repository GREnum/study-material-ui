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
                    "x-auth": currentUser && currentUser.token || ""
                }
            }
        );
        return next.handle(authReq)
            .do(evt => {
                if (evt instanceof HttpResponse) {
                    console.log("---> status:", evt.status);
                    console.log("---> filter:", req.params.get("filter"));
                }
            })
            .catch((res) => {
                if (res.status === 401) {
                    this._router.navigate(["/login"]);
                    return Observable.of([]);
                }
                if (res.status === 400) {
                    this._toasterServise.pop("error", res.statusText, res.error.message);
                    return Observable.of([]);
                }

                return Observable.throw(res);
            }