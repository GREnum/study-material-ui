
import * as _ from "lodash";
import { Injectable } from "@angular/core";


@Injectable()
export class PositionsService {

    constructor() { }

    public mergeProductsWithLocal(products: IProduct[]) {
        let localProducts = this.loadLocalProduct();
        _.each(localProducts, function (localProduct) {
            let product = _.find(products, o => o.id === localProduct.id);
            if (product) {
                product.quantity = 0;
                _.each(localProduct.positions, function (localPosition) {
                    let position = _.find(product.positions, o => o.id === localPosition.id);
                    if (position) {
                        if (position.stock > localPosition.quantity) {
                            position.quantity = localPosition.quantity;
                        } else {
                            position.quantity = position.stock;
                        }
                        product.quantity += position.quantity;
                    }
                });
            }
        });
        return products;
    }

    public changePosition(products: IProduct[], productId: string, positionId: string) {
        let changedProduct: IProduct = this.findProductById(products, productId);
        let changedPosition: IPosition = this.findPositionById(changedProduct.positions, positionId);

        let localProducts: IProduct[] = this.loadLocalProduct();
        let localProduct: IProduct = this.findProductById(localProducts, productId);

        if (!localProduct) {
            localProduct = { id: productId, positions: [] };
            localProducts.push(localProduct);
        }

        let localPosition: IPosition = this.findPositionById(localProduct.positions, positionId);
        if (!localPosition) {
            localPosition = _.pick(changedPosition, ["id", "quantity"]);
            localProduct.positions.push(localPosition);
        } else {
            localPosition.quantity = changedPosition.quantity;
        }
        changedProduct.quantity = 0;
        _.each(changedProduct.positions, function (changedPositionssss) {
            changedProduct.quantity += changedPositionssss.quantity;
        });
        this.clearEmptyProduct(localProducts);
        this.setLocalProduct(localProducts);
    }

    public loadPositions() {
        return JSON.parse(localStorage.getItem("positions")) || [];
    }

    public loadIdProduct(): Array<IProduct> {
        return _.map(this.loadLocalProduct(), o => { return { id: o.id }; });
    }

    public deleteAllposition() {
        let localProducts: IProduct[] = this.loadLocalProduct();
        _.remove(localProducts, o => true);
        this.setLocalProduct(localProducts);
    }

    private clearEmptyProduct(products: IProduct[]) {
        _.each(products, function (product) {
            _.remove(product.positions, o => o.quantity === 0);
        });
        _.remove(products, o => o.positions.length === 0);
    }

    private findProductById(products: IProduct[], productId: string): IProduct {
        return _.find(products, o => o.id === productId);
    }

    private findPositionById(positions: IPosition[], positionId: string): IPosition {
        return _.find(positions, o => o.id === positionId);
    }

    private loadLocalProduct(): IProduct[] {
        return JSON.parse(localStorage.getItem("positions")) || [];
    }

    private setLocalProduct(prodcuts: IProduct[]): void {
        localStorage.setItem("positions", JSON.stringify(prodcuts));
    }
}

export interface IPosition {
    id?: string;
    stock?: number;
    salePrice?: number;
    size?: number;
    quantity?: number;
}

export interface IProduct {
    id: string;
    name?: string;
    image?: string;
    article?: string;
    stock?: number;
    salePrice?: number;
    quantity?: number;
    quantityStock?: number;
    description?: string;
    positions?: IPosition[];
    codeCurrency?: string;
}