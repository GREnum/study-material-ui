
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToasterService } from "angular2-toaster";

import { AuthService } from "../../../_auth/auth.service";
import { RegisterUser } from "../user.component";


@Component({
    selector: "app-change-password",
    templateUrl: "./change-password.component.html"
})
export class ChangePasswordComponent implements OnInit {
    public loading: boolean = false;
    public user: RegisterUser = new RegisterUser();
    public confirmed: boolean = false;
    public isAdmin: boolean = false;
    public allUser: RegisterUser[];

    constructor(
        private _route: ActivatedRoute,
        private _authService: AuthService,
        private _toasterServise: ToasterService
    ) { }

    public ngOnInit() {
        this.allUser = this._route.snapshot.data["users"];
        this.user.name = this._authService.currentUser.user.name;
        this.isAdmin = this._authService.currentUser.user.isAdmin;
    }

    public onChange(confirmPassword: string) {
        confirmPassword !== this.user.password ? this.confirmed = false : this.confirmed = true;
    }

    public change(changeFrom: NgForm) {
        this.loading = true;
        this._authService.changePassword(this.user).subscribe(
            result => {
                this._toasterServise.pop("success", result.title, result.text);
            },
            error => {
                console.log(error);
                console.log("Что-то пошло не так!");
            },
            () => {
                this.loading = false;
            }
        );