import { useState, useEffect } from 'react'
import { Searchbar } from 'react-native-paper'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import ProductList from '../../components/Home/ProductList'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SnackbarMess from '../../components/Notification/SnackbarMess'
import {
    clearResultSearch,
    searchProduct,
} from '../../sliceReducer/searchSlice'
import Loading from '../../components/Loading'

const SearchScreen = () => {
    const insets = useSafeAreaInsets()
    const [searchString, setSearchString] = useState<string>('')
    const [message, setMessage] = useState<string>()

    const onChangeSearch = (query: string) => setSearchString(query)

    const dispatch = useDispatch<any>()
    const books = useSelector((state: any) => state.search.products)
    const loading = useSelector((state: any) => state.search.loading)
    const mess: any = useSelector((state: any) => state.search.message)

    useEffect(() => {
        setMessage(mess)
    }, [mess])

    const handleKeyPressEnter = async () => {
        let _page = 1

        dispatch(searchProduct({ searchString, _page }))
    }

    const handlePressClearIcon = async () => {
        dispatch(clearResultSearch([]))
    }

    if (loading) {
        return <Loading />
    }

    return (
        <SafeAreaView
            style={{
                paddingBottom: insets.bottom + 150,
                position: 'relative',
                height: '100%',
            }}
        >
            <Searchbar
                placeholder='Tìm kiếm theo tên sách, tên tác giả'
                onChangeText={onChangeSearch}
                value={searchString}
                className='m-2 bg-white'
                onSubmitEditing={handleKeyPressEnter}
                onClearIconPress={handlePressClearIcon}
            />
            {books.length !== 0 ? (
                <GestureHandlerRootView>
                    <ProductList products={books} />
                </GestureHandlerRootView>
            ) : (
                <View className='flex justify-center items-center text-price-color h-full w-full'>
                    <Text className='text-price-color'>
                        Không tồn tại sách bạn đang tìm kiếm
                    </Text>
                </View>
            )}

            {/* Hiển thị message thông báo */}
            <SnackbarMess message={message} setMessage={setMessage} />
        </SafeAreaView>
    )
}

export default SearchScreen
