import { useState, Dispatch, SetStateAction, useCallback } from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import { Checkbox, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { IPropItem } from '../../utilities/interface/cart'
import {
    removeProductInCart,
    updateQuantityProduct,
} from '../../sliceReducer/cartSlice'
import { getTitleProduct } from '../../sliceReducer/productsSlice'

interface IPropCartItem {
    product: IPropItem
    selected: any
    onSelect: (id: string) => void
    setLoading: Dispatch<SetStateAction<boolean>>
}

const CardItemCart = (props: IPropCartItem) => {
    const navigation: any = useNavigation()
    const dispatch = useDispatch<any>()

    const { product, selected, onSelect, setLoading } = props

    // xử lý khi số lượng sản phẩm thay đổi
    const [quantityProduct, setQuantityProduct] = useState<number>(
        product.quantityProduct,
    )

    // debounce: chờ 1s khi người dùng không còn bấm nữa thì gọi api update số lượng sản phẩm
    const updateQuantity = useDebouncedCallback(async (quantity: number) => {
        setLoading(true)
        // Call the api with the quantity parameter
        const value: any = await AsyncStorage.getItem('AccessToken')
        const { token }: any = JSON.parse(value)
        try {
            await dispatch(
                updateQuantityProduct({
                    idProduct: product.product._id,
                    quantity,
                    token,
                }),
            )
        } catch (error) {
            // Handle error
        } finally {
            setLoading(false)
        }
    }, 1000)

    const handlePressPlus = () => {
        setQuantityProduct((prev) => prev + 1)
        updateQuantity(quantityProduct + 1)
    }

    const handlePressMinus = () => {
        setQuantityProduct((prev) => prev - 1)
        updateQuantity(quantityProduct - 1)
    }

    // xử lý xóa sản phẩm ra khỏi giỏ hàng
    const handleDeleteProduct = async () => {
        const value: any = await AsyncStorage.getItem('AccessToken')
        const { token } = JSON.parse(value)

        dispatch(
            removeProductInCart({
                idProduct: product.product._id,
                token,
            }),
        )
    }

    const handlePressProduct = useCallback(() => {
        navigation.navigate('DetailBook', { id: product.product._id })
        dispatch(getTitleProduct(product.product.name))
    }, [navigation])

    return (
        <View className='flex flex-row justify-between items-center bg-white mx-2 rounded-lg mt-2 '>
            <View className='flex flex-row items-center flex-1'>
                <View className='ml-2'>
                    <Checkbox
                        color='#22d3ee'
                        status={selected ? 'checked' : 'unchecked'}
                        onPress={() => onSelect(product._id)}
                    />
                </View>
                <View className='flex flex-row items-center justify-start'>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={handlePressProduct}
                    >
                        <Image
                            source={{
                                uri: product.product.images[0].path,
                            }}
                            alt='img'
                            width={120}
                            height={140}
                            className='my-2 ml-2 mr-3'
                        />
                    </TouchableOpacity>
                    <View className='flex justify-start items-start flex-1'>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={handlePressProduct}
                        >
                            <Text className='text-base font-bold'>
                                {product.product.name}
                            </Text>
                        </TouchableOpacity>
                        <Text className='text-price-color'>
                            {product.product?.price?.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </Text>
                        <View className='flex flex-row justify-center items-center'>
                            <IconButton
                                icon='minus-box-outline'
                                onPress={handlePressMinus}
                                disabled={quantityProduct <= 1 ? true : false}
                            />
                            <Text>{quantityProduct}</Text>
                            <IconButton
                                icon='plus-box-outline'
                                onPress={handlePressPlus}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <IconButton icon='delete' size={25} onPress={handleDeleteProduct} />
        </View>
    )
}

export default CardItemCart
