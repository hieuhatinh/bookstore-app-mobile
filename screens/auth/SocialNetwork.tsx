import { Image, Text, View, TouchableOpacity } from 'react-native'

const SocialNetwork = () => {
    return (
        <View>
            <View className='flex justify-between items-center'>
                <TouchableOpacity className='flex flex-row justify-center items-center rounded-3xl py-1 w-full bg-primary-color'>
                    <Image
                        source={require('../../assets/images/google.png')}
                        alt='google'
                        className='w-[20px] h-[20px] object-cover object-center'
                    />
                    <Text className='m-2 text-primary-font text-white'>
                        Login with Google
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className='flex flex-row justify-center items-center rounded-3xl py-1 mt-1 w-full bg-primary-color'>
                    <Image
                        source={require('../../assets/images/facebook.png')}
                        alt='facebook'
                        height={30}
                        width={30}
                        className='w-[20px] h-[20px] object-cover object-center pe-2'
                    />
                    <Text className='m-2 text-primary-font text-white'>
                        Login with Facebook
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SocialNetwork
