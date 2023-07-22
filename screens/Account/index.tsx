import { View, Text } from 'react-native'
import { Avatar, Button } from 'react-native-paper'
import SwitchButton from '../../components/Account/SwitchButton'

const listButton = [
    {
        title: 'Cài đặt tài khoản',
        iconName: 'lock',
        screenName: 'Profile',
    },
    {
        title: 'Thông báo',
        iconName: 'bell-outline',
        screenName: '',
    },
    {
        title: 'Đơn hàng của bạn',
        iconName: 'application-edit-outline',
        screenName: '',
    },
    {
        title: 'Chính sách bảo mật',
        iconName: 'shield-lock-outline',
        screenName: '',
    },
    {
        title: 'Đăng xuất',
        iconName: 'export',
        screenName: 'Login',
    },
]

const AccountScreen = ({ navigation }: any) => {
    const userLogin = true

    return (
        <>
            {userLogin ? (
                <View className='h-full w-full flex justify-center items-center'>
                    <View className='flex justify-between items-center'>
                        <Avatar.Image
                            size={80}
                            source={require('../../assets/images/avatar_mac_dinh.jpg')}
                        />
                        <Text className='text-secondary-font text-third-color mt-2'>
                            nguyentrunghieu@gmail.com
                        </Text>
                    </View>
                    <View className='w-full mt-6'>
                        {listButton.map((item) => (
                            <SwitchButton
                                key={item.title}
                                item={item}
                                navigation={navigation}
                            />
                        ))}
                    </View>
                </View>
            ) : (
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
            )}
        </>
    )
}

export default AccountScreen
