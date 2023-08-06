import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import ProductList from './ProductList'
import productCategoryApi from '../../api/productCategoryApi'
import { IProduct } from '../../utilities/interface/product'
import SnackbarMess from '../Notification/SnackbarMess'

interface IPropCategory {
    category: string
}

const Category = (props: IPropCategory) => {
    const { category } = props
    const navigation = useNavigation<any>()
    const [books, setBooks] = useState<IProduct[] | undefined | null>()
    const [message, setMessage] = useState<string>()

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            const getBooks = async () => {
                let resultBooks
                if (category === 'all') {
                    resultBooks = await productCategoryApi.getAllBook()
                } else {
                    resultBooks = await productCategoryApi.getBookByCategory({
                        category,
                    })
                }

                if (
                    resultBooks.data.statusCode >= 200 &&
                    resultBooks.data.statusCode <= 299
                ) {
                    setMessage(resultBooks.data.message || 'Thành công')
                    setBooks(resultBooks.data.data)
                } else {
                    setMessage(resultBooks.data.message || 'Có lỗi xảy ra')
                }
            }

            getBooks()
        })

        return focusListener
    }, [navigation])

    return (
        <SafeAreaView>
            <GestureHandlerRootView
                style={{
                    position: 'relative',
                }}
            >
                {books?.length !== 0 ? (
                    <ProductList data={books} />
                ) : (
                    <View className='flex justify-center items-center h-full'>
                        <Text className='text-price-color'>
                            Không có sách của thể loại này
                        </Text>
                    </View>
                )}

                <SnackbarMess message={message} setMessage={setMessage} />
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}

export default Category
