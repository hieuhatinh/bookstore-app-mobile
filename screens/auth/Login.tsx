import { Formik } from 'formik'
import { Alert, Text, View } from 'react-native'
import { Appbar, Button, Divider, TextInput } from 'react-native-paper'

import schemaFormLogin from '../../utilities/schema/login'
import SocialNetwork from './SocialNetwork'

interface Values {
    email: string
    password: string
}

const LoginScreeen = () => {
    return (
        <View className='h-full flex justify-start items-start m-4'>
            <View className='w-full'>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => {}} />
                    <Text className='text-primary-font font-bold'>Login</Text>
                </Appbar.Header>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={schemaFormLogin}
                    onSubmit={(values: Values) =>
                        Alert.alert('data', 'values', [{ data: values }])
                    }
                >
                    {({
                        handleChange,
                        handleBlur,
                        touched,
                        values,
                        errors,
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
                                    right={<TextInput.Affix text='/100' />}
                                    editable={true}
                                    error={
                                        touched.email && errors.email?.toString
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
                            <View className='mb-2'>
                                <TextInput
                                    label='Password'
                                    mode='outlined'
                                    placeholder='Password'
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    right={<TextInput.Affix text='/100' />}
                                    editable={true}
                                    secureTextEntry={true}
                                    error={touched.password && errors.password}
                                />
                                {touched.password &&
                                errors.password?.toString ? (
                                    <Text className='text-error'>
                                        {touched.password && errors.password}
                                    </Text>
                                ) : (
                                    <></>
                                )}
                            </View>
                            <Button
                                mode='contained'
                                className='rounded-3xl py-1 text-white bg-primary-color'
                            >
                                <Text className='text-primary-font'>Login</Text>
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
                    <Text className='text-[16px]'>Bạn chưa có tài khoản?</Text>
                    <Button
                        mode='text'
                        className='text-[16px]'
                        onPress={() => Alert.alert('hello')}
                    >
                        <Text className='text-sky-500'>Đăng ký ngay</Text>
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default LoginScreeen
