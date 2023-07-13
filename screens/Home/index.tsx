import { View, Text, FlatList } from 'react-native'
import { Card } from 'react-native-paper'
import Header from '../../components/Home/Header'

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
    {
        id: 4,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
    {
        id: 5,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
    {
        id: 6,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
]

const tabBarList = [
    {
        id: 1,
        title: 'Tất cả',
    },
    {
        id: 2,
        title: 'Văn học trong nước',
    },
    {
        id: 3,
        title: 'Văn học nước ngoài',
    },
    {
        id: 4,
        title: 'Kinh tế',
    },
    {
        id: 5,
        title: 'Tâm lý giáo dục',
    },
    {
        id: 6,
        title: 'Triết học',
    },
    {
        id: 7,
        title: 'Tôn giáo',
    },
    {
        id: 8,
        title: 'Truyện',
    },
    {
        id: 9,
        title: 'Lịch sử - Địa lý',
    },
    {
        id: 10,
        title: 'Khoa học',
    },
]

const HomeScreen = () => {
    return (
        <View className='m-2 mt-0 w-full'>
            <View className='bg-primary-color mb-2'>
                <Text className='text-red-500 text-2xl p-2 font-bold'>
                    Bookstore App
                </Text>
            </View>

            {/* Header */}
            <Header tabbarList={tabBarList} />
            <FlatList
                className='flex w-full pt-1'
                data={data}
                renderItem={({ item, index }) => (
                    <Card className='m-2 flex-1'>
                        <Card.Cover
                            source={{
                                uri: item.image,
                            }}
                            width={50}
                            height={50}
                        />
                        {/* <Card.Title title='' subtitle='Card Subtitle' /> */}
                        <Card.Content>
                            <Text>{item.name}</Text>
                            <Text>{item.author}</Text>
                        </Card.Content>
                    </Card>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                scrollEnabled={true}
            />
            {/* <Footer /> */}
        </View>
    )
}

export default HomeScreen
