import { Formik } from 'formik'
import { ScrollView, Text, View } from 'react-native'
import { Button, Divider, Snackbar, TextInput } from 'react-native-paper'

import schemaFormRegister from '../../utilities/schema/register'
import SocialNetwork from './SocialNetwork'
import { IValuesRegister } from '../../utilities/interface/auth'
import authApi from '../../api/authApi'
import { useState } from 'react'

const RegisterScreen = ({ navigation }: any) => {
    const [messageError, setMessageError] = useState('')

    const onDismissSnackBar = () => setMessageError('')

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
                            const result = await authApi.register({
                                email,
                                password,
                                phoneNumber,
                            })

                            let statusCode = result?.data?.statusCode

                            if (statusCode === 409) {
                                setMessageError(result?.data?.message)
                            } else if (statusCode === 200) {
                                setMessageError(result?.data?.message)
                                navigation.navigate('Login')
                            } else {
                                setMessageError('Có lỗi xảy ra')
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

export default RegisterScreen
