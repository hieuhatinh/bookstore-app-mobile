export interface IValueImage {
    fieldname: string
    originalname: Buffer
    encoding: string
    mimetype: string
    path: string
    size: number
    filename: string
}

export interface IProduct {
    _id: string
    name: string
    price: number
    images: IValueImage[]
    description: string | undefined
    author: string
    seller: string
    type: string[]
    review: string[]
}
