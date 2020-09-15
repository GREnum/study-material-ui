import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "../_auth/auth.service";


@Component({
    selector: "app-admin",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {

    constructor(
        private router: Router,
        private _router: ActivatedRoute,
        private _authService: AuthService
    ) { }

    public async ngOnInit() {
        console.log("AdminComponent loaded");
        console.log(this.router.url);