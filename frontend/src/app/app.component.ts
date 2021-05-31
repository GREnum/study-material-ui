import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToasterService } from "angular2-toaster";


@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    constructor(private _toasterServise: ToasterService) { }
    public popToast() {
        this._toasterServise.pop(