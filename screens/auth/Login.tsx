import { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { Text, View, ScrollView } from 'react-native'
import { Button, Divider, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import schemaFormLogin from '../../utilities/schema/login'
import SocialNetwork from './SocialNetwork'
import { IValuesAuth } from '../../utilities/interface/auth'
import SnackbarMess from '../../components/Notification/SnackbarMess'
import { loginUser, setEmpty } from '../../sliceReducer/authSlice'

const LoginScreen = ({ navigation }: any) => {
    const dispatch = useDispatch<any>()

    const message = useSelector((state: any) => state.auth.message)
    const statusCode = useSelector((state: any) => state.auth.statusCode)

    const [messageError, setMessageError] = useState('')

    useEffect(() => {
        dispatch(setEmpty({ message: '', statusCode: null }))
        if (statusCode === 404) {
            setMessageError(message)
        } else if (statusCode === 200) {
            navigation.navigate('Home')
        }
    }, [message, statusCode, dispatch])

    return (
        <ScrollView>
            <View className='relative h-full flex justify-start items-start m-4'>
                <View className='w-full'>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            phoneNumber: '',
                        }}
                        validationSchema={schemaFormLogin}
                        onSubmit={async (values: IValuesAuth) => {
                            dispatch(loginUser({ ...values }))
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
                <SnackbarMess
                    message={messageError}
                    setMessage={setMessageError}
                />
            </View>
        </ScrollView>
    )
}

export default LoginScreen
