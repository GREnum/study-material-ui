
import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";

import { ProductsService } from "./products.service";
import { PositionsService, IPosition, IProduct } from "../components/positions/position.service";


@Component({
    selector: "app-products",
    templateUrl: "./products.component.html"
})
export class ProductsComponent implements OnInit {
    public limit: number = 5;
    public offset: number = 0;

    public loadingProducts: boolean = false;
    public loadAll: boolean = false;

    // public scrollUpDistance: number = 3;
    public throttle: number = 100;
    public scrollDistance: number = 3;

    public products: IProduct[] = [];
    public productText: string;

    public search: string = "";

    constructor(
        private _productsService: ProductsService,
        private _router: Router,
        private _activatedRouter: ActivatedRoute,
        private _positionsService: PositionsService
    ) { }

    public ngOnInit() {
        this._activatedRouter.data.subscribe(
            data => {
                this.productText = data["productText"] && data["productText"].value || null;
            }
        );
        this._activatedRouter.queryParams.subscribe(
            queryParams => {
                this.search = queryParams["search"] || null;
                this.loadAll = false;
                this.offset = 0;
                this.getAllProduct(true);
            }
        );
    }

    public getAllProduct(cleanProduct?: boolean) {
        this.loadingProducts = true;
        this._productsService.getAll(this.limit, this.offset, this.search).subscribe(
            result => {
                let loadProduct: IProduct[] = this._positionsService.mergeProductsWithLocal(result.products);
                if (loadProduct.length < this.limit) {
                    this.loadAll = true;
                }
                if (cleanProduct) {
                    this.products = [];
                }
                this.products.push(..._.filter(loadProduct, (o) => o.quantityStock > 0));
                this.offset = result.offset;
                this.loadingProducts = false;
            }
        );
    }

    public onScrollDown() {
        if (this.loadingProducts || this.loadAll) {
            return;
        }
        this.offset += this.limit;
        this.getAllProduct();
    }

    public onChangedPosition(objEvent: { productId: string; positionId: string }) {
        this._positionsService.changePosition(this.products, objEvent.productId, objEvent.positionId);
    }

    public onSearch() {
        let extras: NavigationExtras = { relativeTo: this._activatedRouter };
        if (this.search) {
            extras.queryParams = { search: this.search };
        }
        this._router.navigate(["./"], extras);
    }

}