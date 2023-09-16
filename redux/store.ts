import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../sliceReducer/productsSlice'
import cartReducer from '../sliceReducer/cartSlice'
import searchReducer from '../sliceReducer/searchSlice'
import authReducer from '../sliceReducer/authSlice'

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        search: searchReducer,
        auth: authReducer,
    },
})

export default store
