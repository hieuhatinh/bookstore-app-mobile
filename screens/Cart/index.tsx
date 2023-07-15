import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CartItemCart from '../../components/Card/CardItemCart'

const CartScreen = () => {
    return (
        <View className='h-full'>
            <View className='flex flex-row justify-center items-center'>
                <Icon color='#34d399' name='cart-minus' size={25} />
                <Text className='text-primary-font font-bold m-2 text-orange-500'>
                    Giỏ hàng của tôi
                </Text>
            </View>
            <View>
                <CartItemCart />
                <CartItemCart />
                <CartItemCart />
                <CartItemCart />
                <CartItemCart />
            </View>
        </View>
    )
}

export default CartScreen
