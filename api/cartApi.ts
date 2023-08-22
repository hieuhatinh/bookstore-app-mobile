import axiosClient from "./axiosClient"

const cartApi = {
    async getProductsInCart ({idUser}: {idUser: string}) {
        const url = `/cart/${idUser}`

        return await axiosClient.post(url)
    }
}

export default cartApi