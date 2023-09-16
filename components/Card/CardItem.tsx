import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { IProduct } from '../../utilities/interface/product'
import { getTitleProduct } from '../../sliceReducer/productsSlice'

interface IData {
    product: IProduct
}

const CardItem = ({ product }: IData) => {
    const navigation: any = useNavigation()

    const dispatch = useDispatch()

    const handlePress = useCallback(() => {
        navigation.navigate('DetailBook', { id: product._id })
        dispatch(getTitleProduct(product.name))
    }, [navigation])

    return (
        <View className='w-1/2 h-full'>
            <TouchableOpacity
                activeOpacity={1}
                onPress={handlePress}
                className='w-full'
            >
                <Card className='m-2 flex-1'>
                    <Card.Cover
                        source={{
                            uri: product.images[0].path,
                        }}
                        width={50}
                        height={50}
                    />
                    <Card.Content>
                        <Text
                            className='text-base font-semibold'
                            numberOfLines={2}
                        >
                            {product.name}
                        </Text>
                        <Text>{product.author}</Text>
                        <Text className='mt-1 text-secondary-font text-price-color'>
                            {product.price?.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </Text>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        </View>
    )
}

export default CardItem
