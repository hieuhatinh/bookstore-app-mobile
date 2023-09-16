import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import { ScrollView, Text, View } from 'react-native'
import { Button, Divider, TextInput } from 'react-native-paper'

import schemaFormRegister from '../../utilities/schema/register'
import SocialNetwork from './SocialNetwork'
import { IValuesRegister } from '../../utilities/interface/auth'
import { registerUser, setEmpty } from '../../sliceReducer/authSlice'
import SnackbarMess from '../../components/Notification/SnackbarMess'

const RegisterScreen = ({ navigation }: any) => {
    const dispatch = useDispatch<any>()

    const message = useSelector((state: any) => state.auth.message)
    const statusCode = useSelector((state: any) => state.auth.statusCode)

    const [messageError, setMessageError] = useState('')

    useEffect(() => {
        dispatch(setEmpty({ message: '', statusCode: null }))
        if (statusCode === 200) {
            navigation.navigate('Home')
        }
        if (statusCode) {
            setMessageError(message)
        }
    }, [message, statusCode, dispatch])

    return (
        <ScrollView>
            <View className='h-full flex justify-start items-start m-4'>
                <View className='w-full'>
                    <Formik
                        initialValues={{
                            email: '',
                            phoneNumber: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={schemaFormRegister}
                        onSubmit={async (values: IValuesRegister) => {
                            let email = values.email
                            let password = values.password
                            let phoneNumber = values.phoneNumber

                            dispatch(
                                registerUser({ email, password, phoneNumber }),
                            )
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
                                        label='PhoneNumber'
                                        mode='outlined'
                                        placeholder='Phone Number'
                                        onChangeText={handleChange(
                                            'phoneNumber',
                                        )}
                                        onBlur={handleBlur('phoneNumber')}
                                        value={values.phoneNumber}
                                        editable={true}
                                        error={
                                            !!(
                                                touched.phoneNumber &&
                                                errors.phoneNumber?.toString
                                            )
                                        }
                                    />
                                    {touched.phoneNumber &&
                                    errors.phoneNumber?.toString ? (
                                        <Text className='text-error'>
                                            {touched.phoneNumber &&
                                                errors.phoneNumber}
                                        </Text>
                                    ) : (
                                        <></>
                                    )}
                                </View>
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
                                <View>
                                    <TextInput
                                        label='Confirm Password'
                                        mode='outlined'
                                        placeholder='Confirm password'
                                        onChangeText={handleChange(
                                            'confirmPassword',
                                        )}
                                        onBlur={handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                        editable={true}
                                        secureTextEntry={true}
                                        error={
                                            !!(
                                                touched.confirmPassword &&
                                                errors.confirmPassword
                                            )
                                        }
                                    />
                                    {touched.confirmPassword &&
                                    errors.confirmPassword?.toString ? (
                                        <Text className='text-error'>
                                            {touched.confirmPassword &&
                                                errors.confirmPassword}
                                        </Text>
                                    ) : (
                                        <></>
                                    )}
                                </View>
                                <Button
                                    mode='contained'
                                    className='rounded-3xl mt-2 py-1 text-white bg-primary-color'
                                    onPress={() => handleSubmit()}
                                    loading={isSubmitting ? true : false}
                                >
                                    <Text className='text-primary-font'>
                                        Register
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
                                navigation.navigate('Login')
                            }}
                        >
                            <Text className='text-sky-500'>Đăng nhập ngay</Text>
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

export default RegisterScreen
