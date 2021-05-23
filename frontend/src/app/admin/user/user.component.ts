
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { ToasterService } from "angular2-toaster";
import { ActivatedRoute } from "@angular/router";

import { AuthService } from "../../_auth/auth.service";


export class RegisterUser {
    public name: string;
    public password: string;
    public confirmPassword?: string;
    public currencyId?: string;
}
export class Currency {
    public id: string;
    public name: string;
}

@Component({
    selector: "app-register",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
    public user: RegisterUser = new RegisterUser();
    public errorUserMsg: string;
    public loading: boolean = true;
    public allCurrency: Currency[];

    constructor(
        private _route: ActivatedRoute,
        private _authService: AuthService,
        private _toasterServise: ToasterService
    ) { }

    public ngOnInit() {
        this.allCurrency = this._route.snapshot.data["currency"];
    }

    public register(registerForm: NgForm) {
        this._authService.register(this.user.name, this.user.password, this.user.currencyId)
            .subscribe(
            result => {
                this.loading = true;
                this.errorUserMsg = "";
                this._toasterServise.pop("success", "Пользователь успешно зарегистрирован", result.name);
            },
            (error: HttpErrorResponse) => {
                this.errorUserMsg = error.error.message;
                this.loading = false;
            });
    }
    public onEmailChange() {
        console.log(this.user.name);
    }
}