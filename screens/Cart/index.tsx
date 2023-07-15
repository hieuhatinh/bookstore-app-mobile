import { useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CartItemCart from '../../components/Card/CardItemCart'
import { Checkbox } from 'react-native-paper'

const data = [
    {
        id: 1,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
    {
        id: 2,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
    {
        id: 3,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
]

const CartScreen = ({ navigation }: any) => {
    const lengthData = data.length
    const [checkboxes, setCheckboxes] = useState(
        Array.from({ length: lengthData }, () => false),
    )
    const [checkedAll, setCheckedAll] = useState(false)

    const handleCheckboxChange = (index: number) => {
        const newCheckboxes = [...checkboxes]
        newCheckboxes[index] = !newCheckboxes[index]
        setCheckboxes(newCheckboxes)

        const isCheckAllItem = newCheckboxes.filter((item) => item === false)

        if (isCheckAllItem.length === 0) {
            setCheckedAll(true)
        } else {
            setCheckedAll(false)
        }
    }

    const handleCheckAll = () => {
        const newCheckboxes = checkboxes.map(() => !checkedAll)
        setCheckboxes(newCheckboxes)
        setCheckedAll(!checkedAll)
    }

    return (
        <View className='h-full'>
            <View className='flex flex-row justify-center items-center'>
                <Icon color='#34d399' name='cart-minus' size={25} />
                <Text className='text-primary-font font-bold m-2 text-orange-500'>
                    Giỏ hàng của tôi
                </Text>
            </View>
            <View>
                <View className='flex flex-row justify-between items-center bg-white mx-2 rounded-lg mt-2'>
                    <Text className='ml-2 text-primary-font font-bold'>
                        Chọn tất cả
                    </Text>
                    <View className='mr-2'>
                        <Checkbox
                            color='#22d3ee'
                            status={checkedAll ? 'checked' : 'unchecked'}
                            onPress={handleCheckAll}
                        />
                    </View>
                </View>
                <FlatList
                    data={data}
                    renderItem={({ index }) => (
                        <CartItemCart
                            checkboxes={checkboxes}
                            handleCheckboxChange={handleCheckboxChange}
                            index={index}
                            navigation={navigation}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
            <View></View>
        </View>
    )
}

export default CartScreen
