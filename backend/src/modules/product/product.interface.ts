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

export interface IPosition {
    id: string;
    stock?: number;
    salePrice?: number;
    size?: number;
    quantity?: number;
}
export interface IStockEntity {
    meta: {
        href: string;
    };
    image?: {
        meta?: {
            href: string;
        },
        miniature?: {
            href: string;
        }
    };
    name?: string;
    article?: string;
    quantity?: number;
    salePrice?: number;
}
