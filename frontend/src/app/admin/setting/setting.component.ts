import * as _ from "lodash";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ToasterService } from "angular2-toaster";

import { ISetting } from "./setting.interface";
import { SettingService } from "./setting.service";


@Component({
    selector: "app-setting",
    templateUrl: "./setting.component.html"
})
export class SettingComponent implements OnInit {
    public setting: ISetting[];
    public folders: any[];
    public loginStock: ISetting;
    public passwordStock: ISetting;
    public cartText: ISetting;
    public productText: ISetting;
    pu