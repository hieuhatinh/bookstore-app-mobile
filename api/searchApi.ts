import axiosClient from "./axiosClient"

interface ISearch {
    searchString: string, 
    _page: number | undefined | null
}

const searchApi = {
    async search ({searchString, _page}: ISearch) {
        searchString = searchString.trim().toLocaleLowerCase()
        const url = `/product/search?searchString=${searchString}&_page=${_page}`
        const data = {
            searchString, _page
        }

        return await axiosClient.post(url, data)
    }
}

export default searchApi