import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useIsFocused } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'

import ProductList from './ProductList'
import {
    getAllProductThunk,
    getProductByCategory,
} from '../../sliceReducer/productsSlice'
import Loading from '../Loading'

interface IPropCategory {
    category: string
}

const Category = (props: IPropCategory) => {
    const { category } = props
    const dispatch = useDispatch<any>()
    const loading = useSelector((state: any) => state.products.loading)
    const products = useSelector((state: any) => state.products.products)

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            const getBooks = () => {
                if (category === 'all') {
                    dispatch(getAllProductThunk())
                } else {
                    dispatch(getProductByCategory(`${category}`))
                }
            }
            getBooks()
        }
    }, [isFocused, category])

    if (loading) {
        return <Loading />
    }

    return (
        <SafeAreaView>
            <GestureHandlerRootView
                style={{
                    position: 'relative',
                    height: '100%',
                }}
            >
                {products?.length !== 0 ? (
                    <ProductList products={products} />
                ) : (
                    <View className='flex justify-center items-center h-full'>
                        <Text className='text-price-color'>
                            Không có sách của thể loại này
                        </Text>
                    </View>
                )}
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}

export default Category
