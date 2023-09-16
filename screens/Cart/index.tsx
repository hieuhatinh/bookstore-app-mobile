import { useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, FlatList } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button, Checkbox, Divider } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'

import CardItemCart from '../../components/Card/CardItemCart'
import { getProductsInCart } from '../../sliceReducer/cartSlice'
import { IPropItem } from '../../utilities/interface/cart'
import Loading from '../../components/Loading'

const CartScreen = ({ navigation }: any) => {
    const [userLogin, setUserLogin] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const isFocused = useIsFocused()

    const dispatch = useDispatch<any>()
    const result = useSelector((state: any) => state.cart.products)

    // check user đã đăng nhập chưa
    useEffect(() => {
        if (isFocused) {
            const getToken = async () => {
                setLoading(true)
                const value: any = await AsyncStorage.getItem('AccessToken')
                if (value !== null) {
                    setUserLogin(true)
                } else {
                    setUserLogin(false)
                }
                setLoading(false)
            }

            getToken()
        }
    }, [])

    // nếu userLogin thì gọi api lấy products của giỏ hàng / khi products có sự thay đổi (xóa, ...)
    useEffect(() => {
        if (isFocused && userLogin) {
            const getProducts = async () => {
                const value: any = await AsyncStorage.getItem('AccessToken')
                const { token }: any = JSON.parse(value)

                dispatch(getProductsInCart({ token }))
            }

            if (result === undefined) {
                getProducts()
            }
        }
    }, [isFocused, userLogin, result])

    const [selectedIds, setSelectedIds] = useState<any>([])

    // Hàm để cập nhật state khi nhấn vào checkbox
    const handleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((sid: string) => sid !== id))
        } else {
            setSelectedIds([...selectedIds, id])
        }
    }

    // Hàm để tính toán tổng tiền của các sản phẩm đã chọn
    const getSubTotal = useMemo(() => {
        let total = 0
        for (let id of selectedIds) {
            let product = result.products?.find((p: IPropItem) => p._id === id)
            if (product) {
                total += product.product.price * product.quantityProduct
            }
        }
        return total
    }, [selectedIds, result.products])

    // tổng tiền sau khi cộng thêm tiền ship (mặc định tiền ship = 8% tổng tiền mua)
    const getTotalPrice = useMemo(() => {
        return getSubTotal * (1 + 0.08)
    }, [selectedIds, result.products])

    // xử lý khi nhấn checkAll
    const handleCheckAll = () => {
        if (selectedIds.length === result.products.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(result.products.map((p: IPropItem) => p._id))
        }
    }

    if (loading) {
        return <Loading />
    }

    // chưa đăng nhập thì đi đến trang đăng nhập
    if (!userLogin) {
        return (
            <View className='h-full flex justify-center items-center'>
                <Button
                    icon='login'
                    mode='contained'
                    className='bg-primary-color w-11/12'
                    onPress={() => {
                        navigation.navigate('Login')
                    }}
                >
                    Đi đến đăng nhập
                </Button>
            </View>
        )
    }

    return (
        <SafeAreaView className='h-full relative'>
            <View className='flex flex-row justify-center items-center'>
                <Icon color='#34d399' name='cart-minus' size={25} />
                <Text className='text-primary-font font-bold m-2 mt-3 text-orange-500'>
                    Giỏ hàng của tôi
                </Text>
            </View>
            {result.products?.length > 0 ? (
                <View className='h-full'>
                    <View className='flex flex-row justify-start items-center bg-white mx-2 rounded-lg mt-2'>
                        <View className='ml-2'>
                            <Checkbox
                                color='#22d3ee'
                                status={
                                    selectedIds.length ===
                                    result.products?.length
                                        ? 'checked'
                                        : 'unchecked'
                                }
                                onPress={handleCheckAll}
                            />
                        </View>
                        <Text className='text-primary-font font-bold'>
                            Chọn tất cả
                        </Text>
                    </View>
                    <FlatList
                        className='h-[400px]'
                        nestedScrollEnabled={true}
                        data={result.products}
                        renderItem={({ item, index }) => (
                            <CardItemCart
                                product={item}
                                selected={selectedIds.includes(item._id)}
                                onSelect={handleSelect}
                                setLoading={setLoading}
                            />
                        )}
                        keyExtractor={(item) => item?._id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            ) : (
                <View className='absolute top-1/2 right-0 left-0 bottom-0'>
                    <Text className='text-center'>
                        Không có sản phẩm trong giỏ hàng
                    </Text>
                </View>
            )}
            <View className='bg-white rounded m-2 mb-3 p-2 absolute bottom-0 left-0 right-0'>
                <View className='flex flex-row justify-between'>
                    <Text className='text-primary-font font-bold'>
                        Sub total:{' '}
                    </Text>
                    <Text className='text-secondary-font text-price-color'>
                        {getSubTotal.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </Text>
                </View>
                <View className='flex flex-row justify-between my-1'>
                    <Text className='text-primary-font font-bold'>
                        Shipping:{' '}
                    </Text>
                    <Text className='text-secondary-font text-price-color'>
                        8%
                    </Text>
                </View>
                <Divider className='my-1 h-[1px]' />
                <View className='flex flex-row justify-between'>
                    <Text className='text-primary-font font-bold'>Total: </Text>
                    <Text className='text-secondary-font text-price-color'>
                        {getTotalPrice.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CartScreen
