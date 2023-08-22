import { View, Text, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Avatar, Button } from 'react-native-paper'
import SwitchButton from '../../components/Account/SwitchButton'
import { useEffect, useState } from 'react'

interface IPropItem {
    title: string
    iconName: string
    screenName: string
}

const buttons: IPropItem[] = [
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
    const [userLogin, setUserLogin] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>()
    const [avatar, setAvatar] = useState<string>()

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            const getToken = async () => {
                const value: any = await AsyncStorage.getItem('AccessToken')

                if (value !== null) {
                    setUserLogin(true)
                } else {
                    setUserLogin(false)
                }

                const data = JSON.parse(value)
                setUserName(data?.userName)
                setAvatar(data?.avatar)
            }

            getToken()
        })

        return focusListener
    }, [navigation])

    return (
        <>
            {userLogin ? (
                <View className='h-full w-full flex justify-center items-center'>
                    <View className='flex justify-between items-center'>
                        <Avatar.Image
                            size={80}
                            source={
                                avatar ||
                                require('../../assets/images/avatar_mac_dinh.jpg')
                            }
                            className='object-contain'
                        />
                        <Text className='text-secondary-font text-third-color mt-2'>
                            {userName}
                        </Text>
                    </View>
                    <View className='w-full mt-6'>
                        <FlatList
                            data={buttons}
                            renderItem={({ item }) => (
                                <SwitchButton key={item.title} item={item} />
                            )}
                            keyExtractor={(item) => item.title}
                        />
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
