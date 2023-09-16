import { IValueImage } from './product'

export interface IAddProduct {
    idProduct: string
    quantity: number
    token: string
}

export interface IGetProductsCart {
    token: string
}

export interface IPropItem {
    _id: string
    product: {
        _id: string
        images: IValueImage[]
        name: string
        price: number
    }
    quantityProduct: number
}

export interface IItem {
    idProduct: string
    token: string
    quantity?: number
}
