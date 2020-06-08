import { IProduct } from "../product/product.interface";

export interface IStockOrder {
    meta: {
        href: string;
    };
    id: string;
    name: string;
    description?: string;
    sum: number;
    r