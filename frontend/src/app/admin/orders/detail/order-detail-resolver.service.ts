import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { IOrder } from "../orders.component";
import { OrdersService } from "../orders.service";


@Injectable()
export class OrderDetailResolverService implements Resolve<IOrder> {

    constructor(
        private _ordersService: OrdersService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrder> {
        let orderId = route.params["id"];
        let order: Observable<IOrder> = this._ord