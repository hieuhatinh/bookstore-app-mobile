import axiosClient from "./axiosClient"

const productCategoryApi = {
    async getAllBook () {
        const url = '/product/all'
        return await axiosClient.get(url)
    },

    async getDetailBook ({idProduct}: {idProduct: string}) {
        const url = `/product/getDetail/${idProduct}`

        return await axiosClient.get(url)
    }, 

    async getBookByCategory ({category}: {category: string}) {
        const url = `/product/getProductsByType/${category}`
        return await axiosClient.get(url)
    }
}

export default productCategoryApi