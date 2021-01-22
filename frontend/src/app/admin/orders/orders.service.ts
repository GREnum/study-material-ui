import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { IOrder } from "./orders.component";
import { IProduct } from "../components/positions/position.service";


@Injectable()
export class OrdersService {
    constructor(
        private _httpClient: HttpClient
    ) { }

    public getAllOrders(): Observable<any> {
        return this._http