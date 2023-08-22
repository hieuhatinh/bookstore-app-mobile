import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CartItemCart from '../../components/Card/CardItemCart'
import { Badge, Checkbox, Divider } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const data = [
    {
        id: 1,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
        price: 100.0,
    },
    {
        id: 2,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
        price: 200.0,
    },
    {
        id: 3,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
        price: 300.0,
    },
    {
        id: 4,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
        price: 400.0,
    },
    {
        id: 5,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
        price: 500.0,
    },
    {
        id: 6,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
        price: 600.0,
    },
]

interface IPropItem {
    id: number
    name: string
    author: string
    image: string
    price: number
}

interface ICheckBox {
    state: boolean
    price: number
}

const CartScreen = ({ navigation }: any) => {
    const lengthData = data.length
    const [checkboxes, setCheckboxes] = useState<ICheckBox[]>(
        Array.from({ length: lengthData }, () => ({ state: false, price: 0 })),
    )
    const [checkedAll, setCheckedAll] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [userLogin, setUserLogin] = useState<boolean>(false)

    const handleCheckboxChange = (index: number, price: number) => {
        const newCheckboxes = [...checkboxes]
        newCheckboxes[index].state = !newCheckboxes[index].state
        newCheckboxes[index].price = price
        setCheckboxes(newCheckboxes)

        const isCheckAllItem = newCheckboxes.filter(
            (item) => item.state === false,
        )

        if (isCheckAllItem.length === 0) {
            setCheckedAll(true)
        } else {
            setCheckedAll(false)
        }
    }

    const handleCheckAll = (data: IPropItem[]) => {
        const newCheckboxes = checkboxes.map((item, index) => {
            item.state = !checkedAll
            item.price = item.price > 0 ? item.price : data[index].price
            return item
        })
        setCheckboxes(newCheckboxes)
        setCheckedAll(!checkedAll)
    }

    // tính toán tổng tiền của số sản phẩm đã chọn
    useEffect(() => {
        const result = checkboxes.filter((item) => item.state === true)

        const total = result.reduce((preValue, currentValue) => {
            return preValue + currentValue.price
        }, 0)

        setTotalPrice(total)
    }, [checkboxes, checkedAll])

    // check user đã đăng nhập chưa
    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            const getToken = async () => {
                const value: any = await AsyncStorage.getItem('AccessToken')

                if (value !== null) {
                    setUserLogin(true)
                } else {
                    setUserLogin(false)
                }
            }

            getToken()
        })

        return focusListener
    }, [])

    useEffect(() => {}, [userLogin])

    return (
        <SafeAreaView className='h-full'>
            <View className='flex flex-row justify-center items-center'>
                <Icon color='#34d399' name='cart-minus' size={25} />
                <Text className='text-primary-font font-bold m-2 text-orange-500'>
                    Giỏ hàng của tôi
                </Text>
            </View>
            <View>
                <View className='flex flex-row justify-start items-center bg-white mx-2 rounded-lg mt-2'>
                    <View className='ml-2'>
                        <Checkbox
                            color='#22d3ee'
                            status={checkedAll ? 'checked' : 'unchecked'}
                            onPress={() => handleCheckAll(data)}
                        />
                    </View>
                    <Text className='text-primary-font font-bold'>
                        Chọn tất cả
                    </Text>
                </View>
                <FlatList
                    className='h-[400px]'
                    nestedScrollEnabled={true}
                    data={data}
                    renderItem={({ item, index }) => (
                        <CartItemCart
                            item={item}
                            checkboxes={checkboxes}
                            setCheckboxes={setCheckboxes}
                            handleCheckboxChange={handleCheckboxChange}
                            index={index}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
            <View className='bg-white rounded m-2 mb-3 p-2'>
                <View className='flex flex-row justify-between'>
                    <Text className='text-primary-font font-bold'>
                        Sub total:{' '}
                    </Text>
                    <Text className='text-secondary-font text-price-color'>
                        {totalPrice}{' '}
                        <Badge className='bg-transparent text-price-color text-secondary-font'>
                            đ
                        </Badge>
                    </Text>
                </View>
                <View className='flex flex-row justify-between my-1'>
                    <Text className='text-primary-font font-bold'>
                        Shipping:{' '}
                    </Text>
                    <Text className='text-secondary-font text-price-color'>
                        0.0{' '}
                        <Badge className='bg-transparent text-price-color text-secondary-font'>
                            đ
                        </Badge>
                    </Text>
                </View>
                <Divider className='my-1 h-[1px]' />
                <View className='flex flex-row justify-between'>
                    <Text className='text-primary-font font-bold'>Total: </Text>
                    <Text className='text-secondary-font text-price-color'>
                        {totalPrice}{' '}
                        <Badge className='bg-transparent text-price-color text-secondary-font'>
                            đ
                        </Badge>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CartScreen
