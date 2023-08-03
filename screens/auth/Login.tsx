import { useState } from 'react'
import { Formik } from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, View, ScrollView } from 'react-native'
import { Button, Divider, Snackbar, TextInput } from 'react-native-paper'

import schemaFormLogin from '../../utilities/schema/login'
import SocialNetwork from './SocialNetwork'
import authApi from '../../api/authApi'
import { IValuesAuth } from '../../utilities/interface/auth'

const LoginScreen = ({ navigation }: any) => {
    const [messageError, setMessageError] = useState('')

    const onDismissSnackBar = () => setMessageError('')

    return (
        <ScrollView>
            <View className='h-full flex justify-start items-start m-4'>
                <View className='w-full'>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={schemaFormLogin}
                        onSubmit={async (values: IValuesAuth) => {
                            const result = await authApi.login({ ...values })

                            let statusCode = result?.data?.statusCode

                            if (statusCode === 200) {
                                const value = {
                                    token: result?.data?.data.token,
                                    userName:
                                        result?.data?.data?.fullName ||
                                        result?.data?.data?.email,
                                    // avatar: result?.data?.data?.avatar?.path,
                                }
                                await AsyncStorage.setItem(
                                    'AccessToken',
                                    JSON.stringify(value),
                                )

                                setMessageError(result?.data?.message)
                                navigation.navigate('Home')
                            } else {
                                setMessageError(result?.data?.message)
                            }
                        }}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            touched,
                            values,
                            errors,
                            isSubmitting,
                        }) => (
                            <View>
                                <View>
                                    <TextInput
                                        label='Email'
                                        mode='outlined'
                                        placeholder='Email'
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        editable={true}
                                        error={
                                            !!(
                                                touched.email &&
                                                errors.email?.toString
                                            )
                                        }
                                    />
                                    {touched.email && errors.email?.toString ? (
                                        <Text className='text-error'>
                                            {touched.email && errors.email}
                                        </Text>
                                    ) : (
                                        <></>
                                    )}
                                </View>
                                <View>
                                    <TextInput
                                        label='Password'
                                        mode='outlined'
                                        placeholder='Password'
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        editable={true}
                                        secureTextEntry={true}
                                        error={
                                            !!(
                                                touched.password &&
                                                errors.password
                                            )
                                        }
                                    />
                                    {touched.password &&
                                    errors.password?.toString ? (
                                        <Text className='text-error'>
                                            {touched.password &&
                                                errors.password}
                                        </Text>
                                    ) : (
                                        <></>
                                    )}
                                </View>
                                <Button mode='text' className='text-[16px]'>
                                    <Text className='text-sky-500'>
                                        Quên mật khẩu?
                                    </Text>
                                </Button>
                                <Button
                                    mode='contained'
                                    className='rounded-3xl py-1 text-white bg-primary-color'
                                    onPress={() => handleSubmit()}
                                    loading={isSubmitting ? true : false}
                                >
                                    <Text className='text-primary-font'>
                                        Login
                                    </Text>
                                </Button>
                            </View>
                        )}
                    </Formik>
                    <View className='flex flex-row justify-between items-center my-1'>
                        <Divider className='flex-1 h-[2px]' />
                        <Text className='mx-2'>Or</Text>
                        <Divider className='flex-1 h-[2px]' />
                    </View>

                    {/* SocialNetwork */}
                    <SocialNetwork />
                    <View className='flex flex-row justify-center items-center mt-3'>
                        <Text className='text-[16px]'>
                            Bạn chưa có tài khoản?
                        </Text>
                        <Button
                            mode='text'
                            className='text-[16px]'
                            onPress={() => {
                                navigation.navigate('Register')
                            }}
                        >
                            <Text className='text-sky-500'>Đăng ký ngay</Text>
                        </Button>
                    </View>
                </View>

                {/* Hiển thị message thông báo */}
                <Snackbar
                    className='pb-2 mt-[30px]'
                    visible={!!messageError}
                    onDismiss={onDismissSnackBar}
                >
                    {messageError}
                </Snackbar>
            </View>
        </ScrollView>
    )
}

export default LoginScreen
