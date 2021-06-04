
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

import { AuthService } from "../../../_auth/auth.service";


@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    public errorMessage: string;
    public model: any = {};
    public loading: boolean = false;
    public returnUrl: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _authService: AuthService) { }

    public ngOnInit() {
        console.log("LoginComponent->ngOnInit");
        this.returnUrl = this._route.snapshot.queryParams["returnUrl"] || "/admin";
        this._authService.logout();
    }
    public login() {
        console.log("LoginComponent->login");
        this.loading = true;
        this._authService.login(this.model.username, this.model.password)
            .subscribe(
            result => {
                console.log("LoginComponent->login->subscribe->login->result");
                if (result) {
                    this._authService.setStorageCurrentUser(result);
                    this._router.navigate([this.returnUrl]);
                } else {
                    this.errorMessage = "Username or password is incorrect";
                    this.loading = false;
                }
            },
            (error: HttpErrorResponse) => {
                this.errorMessage = error.error.message;
                this.loading = false;
            });
    }
}