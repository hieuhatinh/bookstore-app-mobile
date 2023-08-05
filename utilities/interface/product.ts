export interface IProduct {
    _id: string
    name: string
    price: number
    image: string
    description: string | undefined
    author: string
    seller: string
    type: string[]
    review: string[]
}