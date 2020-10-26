import * as _ from "lodash";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { OrdersService } from "../orders/orders.service";
import { IProduct, PositionsService } from "../components/positions/position.service";
import { RegisterUser } from "../user/user.component";
import { AuthService } from "../../_auth/auth.service";


@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html"
})
export class CartComponent implements OnInit {
    public products: IProduct[];
    public createdOrder: boolean = false;
    public isCartEmpty: boolean = true;
    public summaryCount: number = 0;
    public summaryAmount: numb