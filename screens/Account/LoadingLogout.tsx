import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'

const LoadingLogout = ({ navigation }: any) => {
    // const token = AsyncStorage.getItem('AccessToken')
    // useEffect(() => {
    //     if (!token) {
    navigation.replace('Account')
    //     }
    // }, [token])

    return (
        <ActivityIndicator
            className='flex justify-center items-center w-full h-full'
            animating={true}
            color={MD2Colors.red800}
        />
    )
}

export default LoadingLogout
