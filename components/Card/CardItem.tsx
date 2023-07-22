import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Badge, Card } from 'react-native-paper'

interface IDataItem {
    id: number
    name: string
    author: string
    image: string
}

interface IData {
    data: IDataItem
    navigation: any
}

const CardItem = ({ data, navigation }: IData) => {
    return (
        <View className='w-1/2 h-full'>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    navigation.navigate('DetailBook')
                }}
                className='w-full'
            >
                <Card className='m-2 flex-1'>
                    <Card.Cover
                        source={{
                            uri: data.image,
                        }}
                        width={50}
                        height={50}
                    />
                    <Card.Content>
                        <Text className='text-base font-semibold'>
                            {data.name}
                        </Text>
                        <Text>{data.author}</Text>
                        <Text className='mt-1 text-secondary-font text-price-color'>
                            100.000{' '}
                            <Badge className='text-secondary-font text-price-color bg-transparent'>
                                đ
                            </Badge>
                        </Text>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        </View>
    )
}

export default CardItem
