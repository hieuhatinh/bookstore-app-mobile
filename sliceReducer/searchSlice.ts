/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../utilities/interface/product'
import axiosClient from '../api/axiosClient'

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

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        clearResultSearch: (state, action) => {
            state.products = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchProduct.pending, (state, action) => {
                state.loading = true
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.result
                state.message = action.payload.message
            })
            .addCase(searchProduct.rejected, (state, action) => {
                state.loading = false
                state.message = action.error.message
            })
    },
})

export const searchProduct = createAsyncThunk(
    'products/searchProduct',
    async ({
        searchString,
        _page,
    }: {
        searchString: string
        _page: number
    }) => {
        searchString = searchString
            .trim()
            .replace(/\s+/g, ' ')
            .toLocaleLowerCase()
        const res = await axiosClient.post(
            `/product/search?searchString=${searchString}&_page=${_page}`,
        )
        const result = await res.data.data
        const message = await res.data.message
        return { result, message }
    },
)

export const { clearResultSearch } = searchSlice.actions

export default searchSlice.reducer
