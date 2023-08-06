import { IValuesAuth } from "../utilities/interface/auth"
import axiosClient from "./axiosClient"

const authApi = {
    async login ({email, password}: IValuesAuth) {
        const url = '/auth/login'
        const data = {
            email, 
            password, 
        }
        
        return await axiosClient.post(url, data)
    },

    async register ({email, password}: IValuesAuth) {
        const url = '/auth/register'
        const data = {
            email, 
            password, 
        }
        return await axiosClient.post(url, data)
    }, 

    async updateProfile () {

    },

    async getProfileSeller ({idSeller}: {idSeller: string}) {
        const url = `/auth/${idSeller}`
        return await axiosClient.get(url)
    }
}

export default authApi