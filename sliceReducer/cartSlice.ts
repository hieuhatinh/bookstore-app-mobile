/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../utilities/interface/product'
import axiosClient from '../api/axiosClient'
import { IAddProduct } from '../utilities/interface/cart'

interface ICartSlice {
    loading: boolean
    products: IProduct[]
    message: string | undefined
}

const initialState: ICartSlice = {
    loading: false,
    products: [],
    message: '',
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
            })
            .addCase(getProductsInCart.rejected, (state, action) => {
                state.loading = false
                state.message = action.error.message
            })
            // addProductInCart
            .addCase(addProductInCart.pending, (state, action) => {
                state.loading = true
            })
            .addCase(addProductInCart.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.result
                state.message = action.payload.message
            })
            .addCase(addProductInCart.rejected, (state, action) => {
                state.loading = false
                state.message = action.error.message
            })
            // removeProductInCart
            .addCase(removeProductInCart.pending, (state, action) => {
                state.loading = true
            })
            .addCase(removeProductInCart.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.result
                state.message = action.payload.message
            })
            .addCase(removeProductInCart.rejected, (state, action) => {
                state.loading = false
                state.message = action.error.message
            })
    },
})

export const getProductsInCart = createAsyncThunk(
    'cart/getProductsInCart',
    async (idUser) => {
        const res = await axiosClient.get(`/cart/${idUser}`)
        const result = await res.data.data
        const message = await res.data.message
        return { result, message }
    },
)

export const addProductInCart = createAsyncThunk(
    'cart/addProductInCart',
    async (data: IAddProduct) => {
        const { idUser, idProduct, quantity, price, name } = data
        const res = await axiosClient.post(
            `/addToCart/${idUser}/${idProduct}`,
            { quantity, price, name },
        )
        const result = await res.data.data
        const message = await res.data.message
        return { result, message }
    },
)

export const removeProductInCart = createAsyncThunk(
    'cart/removeProductInCart',
    async (idUser, idProduct) => {
        const res = await axiosClient.delete(
            `/cart/deleteOne/${idUser}/${idProduct}`,
        )
        const result = await res.data.data
        const message = await res.data.message
        return { result, message }
    },
)

export default cartSlice.reducer
