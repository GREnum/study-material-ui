import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ToasterService } from "angular2-toaster";


export interface IOrder {
    id: string;
    name: string;
    sum: number;
    reservedSum: number;
    description?: string;
    quantity?: number;
    state: {
        name: string;
        color: number;
    };
    updated: Date;
    created: Date;
    currencyCode?: string;
    currencyId?: string;
}

@Component({
    selector: "app-orders",
    tem