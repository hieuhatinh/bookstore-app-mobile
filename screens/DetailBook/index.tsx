import { useState, useEffect } from 'react'
import {
    Text,
    View,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import { Avatar, Badge, Button, IconButton, Portal } from 'react-native-paper'
import { Link } from '@react-navigation/native'
import authApi from '../../api/authApi'
import { IValueUser } from '../../utilities/interface/auth'
import SnackbarMess from '../../components/Notification/SnackbarMess'

const description =
    'Tôi đã nếm trải nhiều thất bại trong hành trình đi qua những tháng ngày của mình. Thế nhưng, mỗi chướng ngại cuối cùng đều lại chính là một bàn đạp đưa tôi gần hơn nữa tới chân lý trong tâm khảm và cuộc đời tốt đẹp nhất của mình. Cho dù tôi có thu thập được bao nhiêu tài sản vật chất đi chăng nữa thì cái thằng người mà tôi nhìn thấy trong tấm gương phòng tắm mỗi buổi sáng vẫn y nguyên – tôi không hề hạnh phúc hơn và không hề cảm thấy tốt hơn tí nào. Suy ngẫm nhiều hơn về thực trạng cuộc sống của mình, tôi bắt đầu nhận thức được sự trống rỗng ngay trong tim mình. Tôi bắt đầu chú ý đến những tiếng thầm thì lặng lẽ của con tim, những điều chỉ dẫn tôi rời bỏ nghề nghiệp mình đã chọn và bắt đầu quá trình tìm kiếm tâm hồn một cách nghiêm túc. Tôi bắt đầu suy nghĩ về lý do tại sao tôi lại ở đây, trên hành tinh này, và nhiệm vụ cụ thể của tôi là gì. Tôi tự hỏi tại sao cuộc đời mình lại không có tác dụng và cần phải thực hiện những thay đổi sâu sắc nào để giúp mình đi đúng hướng. Tôi xem xét những niềm tin cốt lõi, những giả định, và những lăng kính mà mình nhìn ra thế giới, và tôi tự cam kết làm sạch những lăng kính không lành mạnh.'

const DetailBook = ({ navigation, route }: any) => {
    const { data } = route.params

    const [buttonPositionY, setButtonPositionY] = useState<any>()
    const [visible, setVisible] = useState<boolean>(false)
    const [sellerProfile, setSellerProfile] = useState<IValueUser>()
    const [message, setMessage] = useState<string>()

    const handleScroll = (event: any) => {
        const result =
            event.nativeEvent.contentOffset.y >
            event.nativeEvent.layoutMeasurement.height - buttonPositionY
        setVisible(result)
    }

    useEffect(() => {
        const getProfileSeller = async () => {
            let idSeller = data.seller
            const result = await authApi.getProfileSeller({ idSeller })

            if (
                result.data.statusCode >= 200 &&
                result.data.statusCode <= 299
            ) {
                setMessage(result.data.message || 'Thành công')
                setSellerProfile(result.data.data)
            } else {
                setMessage(result.data.message || 'Có lỗi xảy ra')
            }
        }

        getProfileSeller()
    }, [])

    return (
        <ScrollView className='relative h-full' onScroll={handleScroll}>
            <SafeAreaView className='flex'>
                {/* Sách và giá */}
                <View className='flex-1 bg-white px-3 pb-3'>
                    <Image
                        source={{
                            uri: data.image,
                        }}
                        resizeMode='contain'
                        height={255}
                        className='flex'
                    />
                    <View className='mt-2'>
                        <Text className='text-large-font text-black'>
                            {data.name}
                        </Text>
                        <Text className='text-secondary-font text-price-color mt-1'>
                            {data.price}{' '}
                            <Badge className='text-secondary-font bg-transparent text-price-color'>
                                đ
                            </Badge>
                        </Text>
                    </View>
                </View>

                {/* Button thêm vào giỏ hàng và mua ngay */}
                <View className='bg-white p-3 mt-2 flex-1'>
                    <Button mode='contained' className='bg-secondary-color'>
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
                            {sellerProfile?.avatar ? (
                                <Avatar.Image
                                    source={{
                                        uri: sellerProfile?.avatar,
                                    }}
                                    size={40}
                                />
                            ) : (
                                <Avatar.Image
                                    source={require('../../assets/images/avatar-seller-default.png')}
                                    size={40}
                                />
                            )}
                            <Text className='ml-2 text-primary-font text-black font-bold'>
                                {sellerProfile?.fullName ||
                                    sellerProfile?.email}
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
                    {data.description ? (
                        <>
                            <Text
                                ellipsizeMode='tail'
                                numberOfLines={4}
                                className='text-third-font mt-1'
                            >
                                {data.description}
                            </Text>
                            <Link
                                to={{
                                    screen: 'ProductDescription',
                                    params: { description: data.description },
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
                    <Text>{data.review}</Text>
                </View>
                <Portal>
                    {visible && (
                        <View className='absolute bottom-0 left-0 right-0 p-3 bg-portal-color flex flex-row items-center'>
                            <Button
                                mode='contained'
                                className='flex-1 bg-secondary-color'
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

                {/* Hiển thị thông báo */}
                <SnackbarMess message={message} setMessage={setMessage} />
            </SafeAreaView>
        </ScrollView>
    )
}

export default DetailBook
