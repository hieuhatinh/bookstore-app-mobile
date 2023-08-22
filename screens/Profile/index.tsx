import { Alert, SafeAreaView, ScrollView } from 'react-native'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { Formik } from 'formik'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import schemaChangeProfile from '../../utilities/schema/changeProfile'

interface IValuesChangeProfile {
    email: string
    password: string
    fullName: string
    phoneNumber: string
    avatar: string
}

const Profile = () => {
    const openImageLibary = async () => {
        const resultImages = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
        })
    }

    return (
        <ScrollView>
            <SafeAreaView className='mt-7 h-full'>
                <View className='flex justify-center items-center'>
                    <View className='relative'>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={openImageLibary}
                        >
                            <Avatar.Image
                                size={80}
                                source={require('../../assets/images/avatar_mac_dinh.jpg')}
                            />
                        </TouchableOpacity>
                        <View className='absolute bottom-0 right-0'>
                            <Icon name='camera' size={20} />
                        </View>
                    </View>
                    <Text className='text-secondary-font text-third-color mt-2'>
                        nguyentrunghieu@gmail.com
                    </Text>
                </View>
                <Formik
                    initialValues={{
                        email: 'nguyentrunghieuduc@gmail.com',
                        password: 'nguyentrunghieu',
                        fullName: 'Nguyễn Trung Hiếu',
                        phoneNumber: '0987654321',
                        avatar: '',
                    }}
                    validationSchema={schemaChangeProfile}
                    onSubmit={(values: IValuesChangeProfile) =>
                        Alert.alert('data')
                    }
                >
                    {({
                        handleChange,
                        handleBlur,
                        touched,
                        values,
                        errors,
                    }) => (
                        <View className='mx-3 mt-6'>
                            <View>
                                <TextInput
                                    mode='outlined'
                                    label='Email'
                                    value={values.email}
                                    disabled
                                />
                                <View>
                                    <TextInput
                                        className='mt-3'
                                        mode='outlined'
                                        label='Password'
                                        placeholder='Change Password'
                                        value={values.password}
                                        editable
                                        secureTextEntry={true}
                                        error={
                                            !!(
                                                touched.password &&
                                                errors.password?.toString()
                                            )
                                        }
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                    />
                                    {touched.password &&
                                    errors.password?.toString() ? (
                                        <Text className='text-error'>
                                            {touched.password &&
                                                errors.password}
                                        </Text>
                                    ) : (
                                        <></>
                                    )}
                                </View>
                                <View>
                                    <TextInput
                                        className='mt-3'
                                        mode='outlined'
                                        label='Full name'
                                        placeholder='Change fullname'
                                        value={values.fullName}
                                        editable
                                        error={
                                            !!(
                                                touched.fullName &&
                                                errors.fullName?.toString()
                                            )
                                        }
                                        onChangeText={handleChange('fullName')}
                                        onBlur={handleBlur('fullName')}
                                    />
                                    {touched.fullName &&
                                    errors.fullName?.toString() ? (
                                        <Text className='text-error'>
                                            {touched.fullName &&
                                                errors.fullName}
                                        </Text>
                                    ) : (
                                        <></>
                                    )}
                                </View>
                                <TextInput
                                    className='mt-3'
                                    mode='outlined'
                                    label='Phone number'
                                    placeholder='Type something'
                                    value={values.phoneNumber}
                                    disabled
                                />
                                <Button
                                    mode='contained'
                                    className='mt-4 bg-primary-color'
                                >
                                    Thay đổi
                                </Button>
                            </View>
                        </View>
                    )}
                </Formik>
            </SafeAreaView>
        </ScrollView>
    )
}

export default Profile
