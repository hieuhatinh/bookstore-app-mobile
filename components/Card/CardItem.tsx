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
        <Card className='w-full'>
            <Card.Cover
                source={{
                    uri: data.image,
                }}
                width={50}
                height={50}
            />
            {/* <Card.Title title='' subtitle='Card Subtitle' /> */}
            <Card.Content>
                <Text>{data.name}</Text>
                <Text>{data.author}</Text>
            </Card.Content>
        </Card>
    )
}

export default CartItem
