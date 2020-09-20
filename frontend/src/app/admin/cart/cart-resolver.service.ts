
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { OrdersService } from "../orders/orders.service";
import { IProduct, PositionsService } from "../components/positions/position.service";


@Injectable()
export class CartResolverService implements Resolve<IProduct> {

    constructor(
        private _ordersService: OrdersService,
        private _positionService: PositionsService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
        let idProducts = this._positionService.loadIdProduct();
        if (idProducts.length) {
            return this._ordersService.getProductById(idProducts);
        } else {
            return Observable.of();
        }
    }

}