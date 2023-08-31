import { useState, useEffect } from 'react'
import { Searchbar } from 'react-native-paper'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import ProductList from '../../components/Home/ProductList'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { IProduct } from '../../utilities/interface/product'
import SnackbarMess from '../../components/Notification/SnackbarMess'
import { searchProduct } from '../../sliceReducer/searchSlice'

const SearchScreen = () => {
    const insets = useSafeAreaInsets()
    const [searchString, setSearchString] = useState<string>('')
    const [message, setMessage] = useState<string>()
    const [dataResult, setDataResult] = useState<IProduct[] | any>()

    const onChangeSearch = (query: string) => setSearchString(query)

    const dispatch = useDispatch<any>()
    const data = useSelector<any>((state: any) => state.search)

    useEffect(() => {
        setDataResult(data)
    }, [data])

    const handleKeyPressEnter = async () => {
        let _page = 1

        dispatch(searchProduct({ searchString, _page }))
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
            />
            {dataResult?.length !== 0 ? (
                <GestureHandlerRootView>
                    <ProductList data={dataResult} />
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
