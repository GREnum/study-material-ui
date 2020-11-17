import { AuthService } from "../../../_auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";


@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
    public userName: string;
    public pushRightClass: string = "push-right";
    constructor(
        private _authService: AuthService
    ) { }

    public ng