import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'

const AccountScreen = ({ navigation }: any) => {
    return (
        <View className='flex justify-center items-center w-full h-full'>
            <Text className='text-primary-font font-bold mb-3'>
                Chào mừng quay trở lại
            </Text>
            <Button
                icon='login'
                mode='contained'
                className='bg-primary-color w-11/12'
                onPress={() => {
                    navigation.navigate('Login')
                }}
            >
                Đăng nhập
            </Button>
            <Button
                icon='lock'
                mode='contained'
                className='bg-primary-color mt-2 w-11/12'
                onPress={() => {
                    navigation.navigate('Register')
                }}
            >
                Đăng ký
            </Button>
        </View>
    )
}

export default AccountScreen
