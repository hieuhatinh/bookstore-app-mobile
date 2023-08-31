import { useNavigation } from '@react-navigation/native'
import { Alert, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Badge, Card } from 'react-native-paper'
import { IProduct } from '../../utilities/interface/product'

interface IData {
    data: IProduct
}

const CardItem = ({ data }: IData) => {
    const navigation: any = useNavigation()

    return (
        <View className='w-1/2 h-full'>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    navigation.navigate('DetailBook', { id: data._id })
                }}
                className='w-full'
            >
                <Card className='m-2 flex-1'>
                    <Card.Cover
                        source={{
                            uri: data.mainImage.path,
                        }}
                        width={50}
                        height={50}
                    />
                    <Card.Content>
                        <Text
                            className='text-base font-semibold'
                            numberOfLines={2}
                        >
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
