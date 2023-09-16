import { View } from 'react-native'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'

const Loading = () => {
    return (
        <View>
            <ActivityIndicator
                className='h-full flex justify-center items-center'
                animating={true}
                color={MD2Colors.red800}
            />
        </View>
    )
}

export default Loading
