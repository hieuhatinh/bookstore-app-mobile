import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../sliceReducer/productsSlice'
import cartReducer from '../sliceReducer/cartSlice'
import searchReducer from '../sliceReducer/searchSlice'

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        search: searchReducer,
    },
})

export default store
