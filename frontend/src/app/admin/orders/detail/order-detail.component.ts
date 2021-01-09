
import { IOrder } from "../orders.component";
import { IProduct } from "../../components/positions/position.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { OrdersService } from "../orders.service";


@Component({
    selector: "app-orders-detail",
    templateUrl: "./order-detail.component.html"
})
export class OrderDetailComponent implements OnInit {
    public products: IProduct[];
    public order: IOrder;

    constructor(
        private _route: ActivatedRoute,
        private _orderService: OrdersService
    ) { }

    public ngOnInit() {
        this.order = this._route.snapshot.data["order"];
        this.products = this._route.snapshot.data["order"].products;
    }
}