import { useEffect, useState } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { launchImageLibrary } from 'react-native-image-picker'
import { Formik } from 'formik'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import schemaChangeProfile from '../../utilities/schema/changeProfile'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileUser, updateProfileUser } from '../../sliceReducer/authSlice'
import Loading from '../../components/Loading'
import SnackbarMess from '../../components/Notification/SnackbarMess'

interface IValuesChangeProfile {
    email: string
    fullName: string
    phoneNumber: string
}

const Profile = () => {
    const dispatch = useDispatch<any>()

    const user = useSelector((state: any) => state.auth.user)
    const loading = useSelector((state: any) => state.auth.loading)
    const statusCode = useSelector((state: any) => state?.auth?.statusCode)
    const message = useSelector((state: any) => state.auth.message)

    const [avatar, setAvatar] = useState<any>()
    const [messageNoti, setMessageNoti] = useState<string>()
    const [isPressSubmit, setIsPressSubmit] = useState<boolean>(false)
    const [updated, setUpdated] = useState<boolean>(false)

    // lấy thông tin người dùng
    useEffect(() => {
        const getUser = () => {
            dispatch(getProfileUser())
        }

        getUser()
        setUpdated(false)
        setIsPressSubmit(false)
    }, [updated])

    useEffect(() => {
        setMessageNoti(message)
    }, [statusCode, message])

    // sau khi press click và statusCode == 200 -> setUpdated: true
    useEffect(() => {
        if (isPressSubmit && statusCode === 200) {
            setUpdated(true)
        }
    }, [isPressSubmit])

    // lấy ảnh từ máy
    const openImageLibary = async () => {
        const resultImages = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
        })

        if (resultImages.assets) {
            setAvatar(resultImages.assets[0])
        }
    }

    const handleSubmitChangeProfile = (values: IValuesChangeProfile) => {
        dispatch(
            updateProfileUser({
                avatar,
                fullName: values.fullName,
            }),
        )
        setIsPressSubmit(true)
    }

    if (loading) {
        return <Loading />
    }

    return (
        <SafeAreaView className='relative h-full'>
            <ScrollView className='mt-7' showsVerticalScrollIndicator={false}>
                <View className='flex justify-center items-center'>
                    <View className='relative'>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={openImageLibary}
                        >
                            {user?.avatar || avatar ? (
                                <Avatar.Image
                                    size={80}
                                    source={{
                                        uri: user?.avatar?.path || avatar?.uri,
                                    }}
                                />
                            ) : (
                                <Avatar.Image
                                    size={80}
                                    source={require('../../assets/images/avatar_mac_dinh.jpg')}
                                />
                            )}
                        </TouchableOpacity>
                        <View className='absolute bottom-0 right-0'>
                            <Icon name='camera' size={20} />
                        </View>
                    </View>
                    <Text className='text-secondary-font text-third-color mt-2'>
                        {user?.fullName || user?.email}
                    </Text>
                </View>
                <Formik
                    initialValues={{
                        email: user?.email,
                        fullName: '',
                        phoneNumber: user?.phoneNumber,
                    }}
                    validationSchema={schemaChangeProfile}
                    onSubmit={handleSubmitChangeProfile}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        touched,
                        values,
                        errors,
                        isSubmitting,
                        dirty,
                        isValid,
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
                                    onPress={() => handleSubmit()}
                                    loading={isSubmitting ? true : false}
                                    disabled={
                                        !(
                                            (dirty &&
                                                isValid &&
                                                values.fullName !== '') ||
                                            avatar
                                        )
                                    }
                                >
                                    Thay đổi
                                </Button>
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
            <SnackbarMess message={messageNoti} setMessage={setMessageNoti} />
        </SafeAreaView>
    )
}

export default Profile
