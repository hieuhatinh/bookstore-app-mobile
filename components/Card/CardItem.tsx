import { Text } from 'react-native'
import { Card } from 'react-native-paper'

interface IDataItem {
    id: number
    name: string
    author: string
    image: string
}

interface IData {
    data: IDataItem
}

const CartItem = ({ data }: IData) => {
    return (
        <Card className='m-2 flex-1'>
            <Card.Cover
                source={{
                    uri: data.image,
                }}
                width={50}
                height={50}
            />
            <Card.Content>
                <Text className='text-base font-semibold'>{data.name}</Text>
                <Text>{data.author}</Text>
            </Card.Content>
        </Card>
    )
}

export default CartItem
