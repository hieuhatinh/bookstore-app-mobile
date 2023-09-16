/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axiosClient from '../api/axiosClient'
import {
    IUpdateProfile,
    IValueUser,
    IValuesAuth,
} from '../utilities/interface/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IAuth {
    loading: boolean
    user: IValueUser | null
    message: string | undefined
    statusCode: number | null
}

const initialState: IAuth = {
    loading: false,
    user: null,
    message: '',
    statusCode: null,
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setEmpty: (state, action) => {
            state.message = action.payload.message
            state.statusCode = action.payload.statusCode
        },
    },
    extraReducers: (builder) => {
        builder
            // loginUser
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.result
                state.message = action.payload.message
                state.statusCode = action.payload.statusCode
            })
            .addCase(loginUser.rejected, (state, action: any) => {
                state.loading = false
                state.message = action.error.message
                state.statusCode = action.payload.statusCode
            })
            // registerUser
            .addCase(registerUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.result
                state.message = action.payload.message
                state.statusCode = action.payload.statusCode
            })
            .addCase(registerUser.rejected, (state, action: any) => {
                state.loading = false
                state.message = action.error.message
                state.statusCode = action.payload.statusCode
            })
            // updateProfileUser
            .addCase(updateProfileUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateProfileUser.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload.message
                state.statusCode = action.payload.statusCode
            })
            .addCase(updateProfileUser.rejected, (state, action: any) => {
                state.loading = false
                state.message = action.error.message
                state.statusCode = action.payload.statusCode
            })
            // getProfileUser
            .addCase(getProfileUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProfileUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.result
                state.message = action.payload.message
            })
            .addCase(getProfileUser.rejected, (state, action) => {
                state.loading = false
                state.message = action.error.message
            })
    },
})

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: IValuesAuth) => {
        const res = await axiosClient.post('/auth/login', { email, password })
        const message = await res.data.message
        const statusCode = await res.data.statusCode
        let result: any = {}
        if (statusCode === 404) {
            return {
                result,
                message,
                statusCode,
            }
        }
        result = await res.data.data
        const value = {
            token: result.token,
            userName: result.fullName || result.email,
            avatar: result.avatar,
        }
        await AsyncStorage.setItem('AccessToken', JSON.stringify(value))
        return { result, message, statusCode }
    },
)

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password, phoneNumber }: IValuesAuth) => {
        const res = await axiosClient.post('/auth/register', {
            email,
            password,
            phoneNumber,
        })
        const message = await res.data.message
        const statusCode = await res.data.statusCode
        let result: any = {}
        if (statusCode === 409) {
            return { result, statusCode, message }
        }

        result = await res.data.data

        const value = {
            token: result.token,
            userName: result.fullName || result.email,
            avatar: result.avatar,
        }
        await AsyncStorage.setItem('AccessToken', JSON.stringify(value))

        return { result, message, statusCode }
    },
)

export const updateProfileUser = createAsyncThunk(
    'auth/updateProfileUser',
    async ({ avatar, fullName }: IUpdateProfile) => {
        const response: any = await AsyncStorage.getItem('AccessToken')
        const value = JSON.parse(response)

        const formData = new FormData()

        if (avatar) {
            formData.append('avatar', {
                uri: avatar.uri,
                name: avatar.fileName,
                type: avatar.type,
            })
        }

        if (fullName) {
            formData.append('fullName', fullName.trim())
        }

        const res = await axiosClient.patch('/auth/update', formData, {
            headers: {
                Authorization: `Bearer ${value.token}`,
                'Content-Type': 'multipart/form-data',
            },
        })

        const result = await res.data.data
        const message = await res.data.message
        const statusCode = await res.data.statusCode

        return { result, message, statusCode }
    },
)

export const getProfileUser = createAsyncThunk(
    'auth/getProfileUser',
    async () => {
        const response: any = await AsyncStorage.getItem('AccessToken')
        const value = JSON.parse(response)

        const res = await axiosClient.get('/auth/profile', {
            headers: {
                Authorization: `Bearer ${value.token}`,
            },
        })
        const result = await res.data.data
        const message = await res.data.message

        await AsyncStorage.setItem(
            'AccessToken',
            JSON.stringify({
                ...value,
                userName: result.fullName || result.email,
                avatar: result.avatar,
            }),
        )

        return { result, message }
    },
)

export const { setEmpty } = authSlice.actions

export default authSlice.reducer
