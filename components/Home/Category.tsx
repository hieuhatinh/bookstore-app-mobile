import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useIsFocused } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'

import ProductList from './ProductList'
import SnackbarMess from '../Notification/SnackbarMess'
import {
    getAllProductThunk,
    getProductByCategory,
} from '../../sliceReducer/productsSlice'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'
import { IProduct } from '../../utilities/interface/product'

interface IPropCategory {
    category: string
}

const Category = (props: IPropCategory) => {
    const { category } = props
    const dispatch = useDispatch<any>()
    const res = useSelector((state: any) => state.products)

    const [data, setData] = useState<any>()
    const [message, setMessage] = useState<string>()
    const isFocused = useIsFocused()

    useEffect(() => {
        setData(res)
    }, [res])

    useEffect(() => {
        if (isFocused === true) {
            const getBooks = () => {
                if (category === 'all') {
                    dispatch(getAllProductThunk())
                } else {
                    dispatch(getProductByCategory('category'))
                }
            }
            getBooks()
        }
    }, [category, isFocused])

    return (
        <SafeAreaView>
            {res.loading ? (
                <ActivityIndicator animating={true} color={MD2Colors.red800} />
            ) : (
                <GestureHandlerRootView
                    style={{
                        position: 'relative',
                        height: '100%',
                    }}
                >
                    {data?.products.length !== 0 ? (
                        <ProductList data={data?.products} />
                    ) : (
                        <View className='flex justify-center items-center h-full'>
                            <Text className='text-price-color'>
                                Không có sách của thể loại này
                            </Text>
                        </View>
                    )}

                    <SnackbarMess message={message} setMessage={setMessage} />
                </GestureHandlerRootView>
            )}
        </SafeAreaView>
    )
}

export default Category
