/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../utilities/interface/product'
import axiosClient from '../api/axiosClient'
import {
    IAddProduct,
    IItem,
    IGetProductsCart,
} from '../utilities/interface/cart'

interface ICartSlice {
    loading: boolean
    products: IProduct[]
    message: string | undefined
    statusCode: number | null
    numberProducts: number
}

const initialState: ICartSlice = {
    loading: false,
    products: [],
    message: '',
    statusCode: null,
    numberProducts: 0,
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        // getAllProduct: (state, action) => {
        //     state.text = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            // getProductsInCart
            .addCase(getProductsInCart.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProductsInCart.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.result
                state.message = action.payload.message
                state.statusCode = action.payload.statusCode
            })
            .addCase(getProductsInCart.rejected, (state, action: any) => {
                state.loading = false
                state.message = action.error.message
                state.statusCode = action.payload.statusCode
            })
            // addProductInCart
            .addCase(addProductInCart.pending, (state, action) => {
                state.loading = true
            })
            .addCase(addProductInCart.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.result
                state.message = action.payload.message
                state.statusCode = action.payload.statusCode
            })
            .addCase(addProductInCart.rejected, (state, action: any) => {
                state.loading = false
                state.message = action.error.message
                state.statusCode = action.payload.statusCode
            })
            // removeProductInCart
            .addCase(removeProductInCart.pending, (state, action) => {
                state.loading = true
            })
            .addCase(removeProductInCart.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.result
                state.message = action.payload.message
                state.statusCode = action.payload.statusCode
            })
            .addCase(removeProductInCart.rejected, (state, action: any) => {
                state.loading = false
                state.message = action.error.message
                state.statusCode = action.payload.statusCode
            })
            // updateQuantityProduct
            .addCase(updateQuantityProduct.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateQuantityProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.result
                state.message = action.payload.message
                state.statusCode = action.payload.statusCode
            })
            .addCase(updateQuantityProduct.rejected, (state, action: any) => {
                state.loading = false
                state.message = action.error.message
                state.statusCode = action.payload.statusCode
            })
    },
})

export const getProductsInCart = createAsyncThunk(
    'cart/getProductsInCart',
    async (data: IGetProductsCart) => {
        const { token } = data
        const res = await axiosClient.get(`/cart/getAllInCarts`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        const result = await res.data.data
        const message = await res.data.message
        const statusCode = await res.data.statusCode
        return { result, message, statusCode }
    },
)

export const addProductInCart = createAsyncThunk(
    'cart/addProductInCart',
    async (data: IAddProduct) => {
        const { idProduct, token, quantity } = data

        const res = await axiosClient.post(
            `/cart/addToCart/${idProduct}?quantity=${quantity}`,
            {},
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            },
        )
        const result = await res.data.data
        const message = await res.data.message
        const statusCode = await res.data.statusCode

        return { result, message, statusCode }
    },
)

export const removeProductInCart = createAsyncThunk(
    'cart/removeProductInCart',
    async (data: IItem) => {
        const { idProduct, token } = data

        const res = await axiosClient.delete(`/cart/deleteOne/${idProduct}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        const result = await res.data.data

        const message = await res.data.message
        const statusCode = await res.data.statusCode
        return { result, message, statusCode }
    },
)

export const updateQuantityProduct = createAsyncThunk(
    'cart/updateQuantityProduct',
    async (data: IItem) => {
        const { idProduct, quantity, token } = data

        const res = await axiosClient.delete(
            `/cart/updateOne/${idProduct}?quantity=${quantity}`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            },
        )
        const result = await res.data.data
        const message = await res.data.message
        const statusCode = await res.data.statusCode
        return { result, message, statusCode }
    },
)

export default cartSlice.reducer
