import { useState, useEffect } from 'react'
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import { Avatar, Button, IconButton, Portal } from 'react-native-paper'
import { Link } from '@react-navigation/native'

import ImageBooks from '../../components/DetailBook/ImageBooks'
import { useDispatch, useSelector } from 'react-redux'
import {
    getDetailProduct,
    getTitleProduct,
} from '../../sliceReducer/productsSlice'
import { addProductInCart } from '../../sliceReducer/cartSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SnackbarMess from '../../components/Notification/SnackbarMess'
import DialogMessage from '../../components/DialogMessage'

const DetailBook = ({ navigation, route }: any) => {
    const { id } = route.params

    const dispatch = useDispatch<any>()

    const book = useSelector((state: any) => state.products.products)
    const loading = useSelector((state: any) => state.products.loading)
    const messageCart = useSelector((state: any) => state.cart.message)
    const statusCodeCart = useSelector((state: any) => state.cart.statusCode)

    const [buttonPositionY, setButtonPositionY] = useState<any>()
    const [visible, setVisible] = useState<boolean>(false)
    const [quantityProduct, setQuantityProduct] = useState<number>(1)
    const [loadingAdd, setLoadingAdd] = useState<boolean>(false)
    const [messageNotify, setMessageNotify] = useState<string>('') // message thông báo khi thêm vào giỏ hàng thành công
    const [isPressAdd, setIsPressAdd] = useState<boolean>(false)
    const [content, setContent] = useState<{
        describe: string
        textButton: string
        href?: string
    }>({ describe: '', textButton: '' })

    const handleScroll = (event: any) => {
        const result =
            event.nativeEvent.contentOffset.y >
            event.nativeEvent.layoutMeasurement.height - buttonPositionY
        setVisible(result)
    }

    // lấy thông tin của sách
    useEffect(() => {
        const getProfileProduct = async () => {
            dispatch(getDetailProduct(id))
        }

        getProfileProduct()
    }, [])

    // ẩn hiện Dialog
    const handlePressBuyNow = () => {
        setContent({
            describe: 'Tính năng đang được phát triển',
            textButton: 'OK',
        })
        setVisible(true)
    }

    // xử lý khi bấm thêm vào giỏ hàng
    const handlePressPlus = () => {
        setQuantityProduct((prev) => prev + 1)
    }

    const handlePressMinus = () => {
        setQuantityProduct((prev) => prev - 1)
    }

    const handlePressAddToCart = async () => {
        setLoadingAdd(true)
        setIsPressAdd(true)
        const value: any = await AsyncStorage.getItem('AccessToken')
        if (value === null) {
            setContent({
                describe: 'Bạn chưa đăng nhập',
                textButton: 'Đi đăng nhập',
                href: 'Login',
            })
            setVisible(true)
        } else {
            const { token } = JSON.parse(value)
            const idProduct = book._id

            dispatch(
                addProductInCart({
                    idProduct,
                    quantity: quantityProduct,
                    token,
                }),
            )
        }

        setLoadingAdd(false)
    }

    // xử lý khi thêm vào giỏ hàng thành công
    useEffect(() => {
        if (isPressAdd && statusCodeCart) {
            setMessageNotify(messageCart)
        }
    }, [statusCodeCart, isPressAdd])

    useEffect(() => {
        dispatch(getTitleProduct(book.name))
    }, [loading])

    if (loading) {
        return (
            <View>
                <Text>Đang load dữ liệu ... </Text>
            </View>
        )
    }

    return (
        <SafeAreaView className='flex'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                className='relative h-full'
                onScroll={handleScroll}
            >
                {/* Sách và giá */}
                <View className='flex-1 bg-white px-3 pb-3'>
                    <ImageBooks images={book?.images} />
                    <View className='mt-2'>
                        <Text className='text-large-font text-black'>
                            {book.name}
                        </Text>
                        <Text className='text-secondary-font text-price-color mt-1'>
                            {book?.price?.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </Text>
                        <View className='flex flex-row justify-between items-center'>
                            <Text className='text-secondary-font text-black'>
                                Số lượng
                            </Text>
                            <View className='flex flex-row justify-center items-center'>
                                <IconButton
                                    icon='minus-box-outline'
                                    onPress={handlePressMinus}
                                    disabled={
                                        quantityProduct <= 1 ? true : false
                                    }
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

                {/* Button thêm vào giỏ hàng và mua ngay */}
                <View className='bg-white p-3 mt-2 flex-1'>
                    <Button
                        mode='contained'
                        className='bg-secondary-color'
                        onPress={handlePressAddToCart}
                        loading={loadingAdd}
                    >
                        Thêm vào giỏ
                    </Button>
                    <Button
                        mode='outlined'
                        textColor='#3b82f6'
                        className='mt-2'
                        style={{ borderColor: '#3b82f6' }}
                        onLayout={(e: any) =>
                            setButtonPositionY(
                                e.nativeEvent.layout.y +
                                    e.nativeEvent.layout.height,
                            )
                        }
                        onPress={handlePressBuyNow}
                    >
                        Mua ngay
                    </Button>
                </View>

                {/* nhà bán sách */}
                <View className='bg-white p-3 mt-2 flex-1'>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className='flex flex-row flex-1 justify-between items-center'
                    >
                        <View className='flex flex-row justify-center items-center'>
                            <Avatar.Image
                                source={
                                    typeof book.seller?.avatar.path === 'string'
                                        ? { uri: book.seller?.avatar.path }
                                        : require('../../assets/images/avatar_seller_default.png')
                                }
                                size={40}
                            />
                            <Text className='ml-2 text-primary-font text-black font-bold'>
                                {book.seller?.fullName || book.seller?.email}
                            </Text>
                        </View>
                        <IconButton icon='chevron-right' />
                    </TouchableOpacity>
                    <View className='flex flex-row mt-2 flex-1'>
                        <Button
                            mode='outlined'
                            icon='plus'
                            textColor='#3b82f6'
                            style={{ borderColor: '#3b82f6' }}
                            className='flex-1'
                        >
                            Theo dõi
                        </Button>
                        <Button
                            mode='outlined'
                            icon='chat-outline'
                            textColor='#3b82f6'
                            className='flex-1 ml-2'
                            style={{ borderColor: '#3b82f6' }}
                        >
                            Chat
                        </Button>
                    </View>
                </View>

                {/* Thông tin chi tiết */}
                <View className='bg-white p-3 mt-2 flex-1'>
                    <Text className='text-primary-font text-black font-bold'>
                        Thông tin chi tiết
                    </Text>
                </View>

                {/* Mô tả sản phẩm */}
                <View className='bg-white p-3 mt-2 flex-1'>
                    <Text className='text-primary-font text-black font-bold'>
                        Mô tả sản phẩm
                    </Text>
                    {book.description ? (
                        <>
                            <Text
                                ellipsizeMode='tail'
                                numberOfLines={4}
                                className='text-third-font mt-1'
                            >
                                {book.description}
                            </Text>
                            <Link
                                to={{
                                    screen: 'ProductDescription',
                                    params: { description: book.description },
                                }}
                                style={{
                                    color: '#3b82f6',
                                    textAlign: 'center',
                                    marginTop: 4,
                                }}
                            >
                                Xem chi tiết
                            </Link>
                        </>
                    ) : (
                        <Text className='text-center py-2'>
                            Không có thông tin mô tả sản phẩm chi tiết
                        </Text>
                    )}
                </View>

                {/* khách hàng đánh giá */}
                <View className='bg-white px-3 py-0 mt-2'>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className='flex flex-row justify-between items-center'
                    >
                        <Text className='text-primary-font text-black font-bold'>
                            Khách hàng đánh giá
                        </Text>
                        <IconButton icon='chevron-right' />
                    </TouchableOpacity>
                    <Text>{book.review}</Text>
                </View>
                <Portal>
                    {visible && (
                        <View className='absolute bottom-0 left-0 right-0 p-3 bg-portal-color flex flex-row items-center'>
                            <Button
                                mode='contained'
                                className='flex-1 bg-secondary-color'
                                onPress={handlePressAddToCart}
                            >
                                Thêm vào giỏ
                            </Button>
                            <Button
                                mode='outlined'
                                textColor='#3b82f6'
                                className='flex-1 ml-2'
                                style={{ borderColor: '#3b82f6' }}
                                onLayout={(e: any) =>
                                    setButtonPositionY(
                                        e.nativeEvent.layout.y +
                                            e.nativeEvent.layout.height,
                                    )
                                }
                            >
                                Mua ngay
                            </Button>
                        </View>
                    )}
                </Portal>
            </ScrollView>

            {/* thông báo thêm vào giỏ hàng thành công */}
            {messageNotify.length > 0 && isPressAdd && (
                <SnackbarMess
                    message={messageNotify}
                    setMessage={setMessageNotify}
                    action={{
                        label: 'Đi đến giỏ hàng',
                        onPress: () => {
                            navigation.navigate('Cart')
                        },
                    }}
                />
            )}

            {/* Nhấn  vào mua ngay / chưa đăng nhập */}
            <DialogMessage
                visible={visible}
                setVisible={setVisible}
                content={content}
            />
        </SafeAreaView>
    )
}

export default DetailBook
