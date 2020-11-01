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
    public summaryAmount: number = 0;
    public codeCurrency: string = "";
    public allUser: RegisterUser[];
    public isAdmin: boolean = false;

    public chooseUser: string;
    public name: string;

    public cartText: string;

    constructor(
        private _ordersService: OrdersService,
        private _positionsService: PositionsService,
        private _activatedRouter: ActivatedRoute,
        private _authService: AuthService,
        private _router: Router
    ) { }

    public ngOnInit() {
        this.allUser = _.filter(this._activatedRouter.snapshot.data["users"], (o: any) => { return !!o.stockId; });
        this.isAdmin = this._authService.currentUser.user.isAdmin;
        this._activatedRouter.data.subscribe(
            data => {
                this.cartText = data["cartText"] && data["cartText"].value || null;
                this.isCartEmpty = _.isEmpty(data.products);
                this.products = this._positionsService.mergeProductsWithLocal(data["products"]);
                this.reloadSummary();
            }
        );
    }

    public onChangedPosition(objEvent: { productId: string; positionId: string }) {
        this._positionsService.changePosition(this.products, objEvent.productId, objEvent.positionId);
        this.reloadSummary();
    }

    public createOrder() {
        this.createdOrder = true;
        this._ordersService.createOrder(this.products, this.chooseUser).subscribe(
            result => {
                this._positionsService.deleteAllposition();
                this._router.navigate(["/admin/orders"]);
                this.createdOrder = false;
            }
        );
    }

    private reloadSummary() {
        this.summaryCount = 0;
        this.summaryAmount = 0;
        _.each(this.products, (product) => {
            this.summaryCount += product.quantity;
            this.summaryAmount += product.quanti