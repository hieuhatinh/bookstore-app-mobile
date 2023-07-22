import { useState } from 'react'
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

const description =
    'Tôi đã nếm trải nhiều thất bại trong hành trình đi qua những tháng ngày của mình. Thế nhưng, mỗi chướng ngại cuối cùng đều lại chính là một bàn đạp đưa tôi gần hơn nữa tới chân lý trong tâm khảm và cuộc đời tốt đẹp nhất của mình. Cho dù tôi có thu thập được bao nhiêu tài sản vật chất đi chăng nữa thì cái thằng người mà tôi nhìn thấy trong tấm gương phòng tắm mỗi buổi sáng vẫn y nguyên – tôi không hề hạnh phúc hơn và không hề cảm thấy tốt hơn tí nào. Suy ngẫm nhiều hơn về thực trạng cuộc sống của mình, tôi bắt đầu nhận thức được sự trống rỗng ngay trong tim mình. Tôi bắt đầu chú ý đến những tiếng thầm thì lặng lẽ của con tim, những điều chỉ dẫn tôi rời bỏ nghề nghiệp mình đã chọn và bắt đầu quá trình tìm kiếm tâm hồn một cách nghiêm túc. Tôi bắt đầu suy nghĩ về lý do tại sao tôi lại ở đây, trên hành tinh này, và nhiệm vụ cụ thể của tôi là gì. Tôi tự hỏi tại sao cuộc đời mình lại không có tác dụng và cần phải thực hiện những thay đổi sâu sắc nào để giúp mình đi đúng hướng. Tôi xem xét những niềm tin cốt lõi, những giả định, và những lăng kính mà mình nhìn ra thế giới, và tôi tự cam kết làm sạch những lăng kính không lành mạnh.'

const DetailBook = () => {
    const [buttonPositionY, setButtonPositionY] = useState<any>()
    const [visible, setVisible] = useState<boolean>(false)

    const handleScroll = (event: any) => {
        const result =
            event.nativeEvent.contentOffset.y >
            event.nativeEvent.layoutMeasurement.height - buttonPositionY
        setVisible(result)
    }

    return (
        <ScrollView className='relative h-full' onScroll={handleScroll}>
            <SafeAreaView className='flex'>
                {/* Sách và giá */}
                <View className='flex-1 bg-white px-3 pb-3'>
                    <Image
                        source={{
                            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyN-G0fuJGalSACdC5HKM8OJacpyBr7TLciA&usqp=CAU',
                        }}
                        resizeMode='contain'
                        height={255}
                        className='flex'
                    />
                    <View className='mt-2'>
                        <Text className='text-large-font text-black'>
                            3 người thầy vĩ đại
                        </Text>
                        <Text className='text-secondary-font text-price-color mt-1'>
                            100.000{' '}
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
                            <Avatar.Image
                                source={{
                                    uri: 'https://salt.tikicdn.com/cache/w220/ts/seller/2e/85/b7/e76104ae5f1beaf244f319e2f0d2d413.jpg',
                                }}
                                size={40}
                            />
                            <Text className='ml-2 text-primary-font text-black font-bold'>
                                Phương Đông Books
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
                    <Text
                        ellipsizeMode='tail'
                        numberOfLines={4}
                        className='text-third-font mt-1'
                    >
                        {description}
                    </Text>
                    <Link
                        to={{
                            screen: 'ProductDescription',
                            params: { description: description },
                        }}
                        style={{
                            color: '#3b82f6',
                            textAlign: 'center',
                            marginTop: 4,
                        }}
                    >
                        Xem chi tiết
                    </Link>
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
                    <Text>
                        “Tôi đã nếm trải nhiều thất bại trong hành trình đi qua
                        những tháng ngày của mình. Thế nhưng, mỗi chướng ngại
                        cuối cùng đều lại chính là một bàn đạp đưa tôi gần hơn
                        nữa tới chân lý trong tâm khảm và cuộc đời tốt đẹp nhất
                        của mình. Cho dù tôi có thu thập được bao nhiêu tài sản
                        vật chất đi chăng nữa thì cái thằng người mà tôi nhìn
                        thấy trong tấm gương phòng tắm mỗi buổi sáng vẫn y
                        nguyên – tôi không hề hạnh phúc hơn và không hề cảm thấy
                        tốt hơn tí nào. Suy ngẫm nhiều hơn về thực trạng cuộc
                        sống của mình, tôi bắt đầu nhận thức được sự trống rỗng
                        ngay trong tim mình. Tôi bắt đầu chú ý đến những tiếng
                        thầm thì lặng lẽ của con tim, những điều chỉ dẫn tôi rời
                        bỏ nghề nghiệp mình đã chọn và bắt đầu quá trình tìm
                        kiếm tâm hồn một cách nghiêm túc. Tôi bắt đầu suy nghĩ
                        về lý do tại sao tôi lại ở đây, trên hành tinh này, và
                        nhiệm vụ cụ thể của tôi là gì. Tôi tự hỏi tại sao cuộc
                        đời mình lại không có tác dụng và cần phải thực hiện
                        những thay đổi sâu sắc nào để giúp mình đi đúng hướng.
                        Tôi xem xét những niềm tin cốt lõi, những giả định, và
                        những lăng kính mà mình nhìn ra thế giới, và tôi tự cam
                        kết làm sạch những lăng kính không lành mạnh.” “Cuốn
                        sách này là một tác phẩm hư cấu. Đây là câu chuyện về
                        một người đàn ông có tên Jack Valentine mà đường đời có
                        nhiều điểm giống với tôi. Có cảm nhận rất không đầy đủ
                        với tư cách một con người, anh ấy lên kế hoạch tìm kiếm
                        tri thức để sống một cuộc sống hạnh phúc hơn, khoẻ khoắn
                        hơn và đẹp hơn.” Những “Câu hỏi cuối cùng” là một điều
                        kì lạ mà Jack nghe được từ người bệnh nhân già nằm cùng
                        phòng với anh – ông Cal. Chỉ sau một buổi tối trò chuyện
                        cùng ông, Jack đã nhận thấy những sự thay đổi đang diễn
                        ra trong mình. Và từ đây, chuyến hành trình đến Rome,
                        Hawaii và New York cùng những khám phá mới mẻ mà anh học
                        được từ ba người thầy vĩ đại trong cuộc đời đã giúp anh
                        trả lời được ba câu hỏi mà cha anh – Cal Valentine đã
                        nói trước khi ông qua đời:
                    </Text>
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
            </SafeAreaView>
        </ScrollView>
    )
}

export default DetailBook
