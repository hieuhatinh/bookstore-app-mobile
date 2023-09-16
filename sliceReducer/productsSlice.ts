/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../utilities/interface/product'
import axiosClient from '../api/axiosClient'

interface IProductsSlice {
    loading: boolean
    products: IProduct[]
    message: string | undefined
    titleProduct: string
}

const initialState: IProductsSlice = {
    loading: false,
    products: [],
    message: '',
    titleProduct: '',
}

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState,
    reducers: {
        getTitleProduct: (state, action) => {
            state.titleProduct = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductThunk.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllProductThunk.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.result
                state.message = action.payload.message
            })
            .addCase(getAllProductThunk.rejected, (state, action) => {
                state.loading = false
                state.message = action.error.message
            })
            .addCase(getProductByCategory.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProductByCategory.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.result
                state.message = action.payload.message
            })
            .addCase(getProductByCategory.rejected, (state, action) => {
                state.loading = false
                state.message = action.error.message
            })
            .addCase(getDetailProduct.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getDetailProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.result
                state.message = action.payload.message
            })
            .addCase(getDetailProduct.rejected, (state, action) => {
                state.loading = false
                state.message = action.error.message
            })
    },
})

export const getAllProductThunk = createAsyncThunk(
    'products/getAllProductThunk',
    async () => {
        const res = await axiosClient.get('/product/all')
        const result = await res.data.data
        const message = await res.data.message
        return { result, message }
    },
)

export const getProductByCategory = createAsyncThunk(
    'products/getProductByCategory',
    async (category: string) => {
        const res = await axiosClient.get(
            `/product/getProductsByType/${category}`,
        )
        const result = await res.data.data
        const message = await res.data.message
        return { result, message }
    },
)

export const getDetailProduct = createAsyncThunk(
    'products/getDetailProduct',
    async (idProduct: string) => {
        const res = await axiosClient.get(`/product/getDetail/${idProduct}`)
        const result = await res.data.data
        const message = await res.data.message
        return { result, message }
    },
)

export const { getTitleProduct } = productsSlice.actions

export default productsSlice.reducer
