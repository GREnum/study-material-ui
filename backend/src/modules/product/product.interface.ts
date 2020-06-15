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
    codeCurrency?: string