import { useState } from 'react'
import { Searchbar, Snackbar } from 'react-native-paper'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView, Text, View } from 'react-native'

import ProductList from '../../components/Home/ProductList'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import searchApi from '../../api/searchApi'
import { IProduct } from '../../utilities/interface/product'

const SearchScreen = ({ navigation }: any) => {
    const insets = useSafeAreaInsets()
    const [searchString, setSearchString] = useState<string>('')
    const [message, setMessage] = useState<string>()
    const [dataResult, setDataResult] = useState<IProduct[] | any>()

    const onChangeSearch = (query: string) => setSearchString(query)
    const onDismissSnackBar = () => setMessage('')

    const handleKeyPressEnter = async () => {
        let _page = 1
        const result = await searchApi.search({ searchString, _page })
        console.log(result.data)

        let statusCode = result.data.statusCode

        if (statusCode === 200) {
            setDataResult(result.data.data)
            setMessage(result.data.message || 'Thành công')
        } else {
            setMessage(result.data.message || 'Xảy ra lỗi')
        }
        console.log(dataResult.length)
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
                    <ProductList data={dataResult} category={null} />
                </GestureHandlerRootView>
            ) : (
                <View className='flex justify-center items-center text-price-color h-full w-full'>
                    <Text className='text-price-color'>
                        Không tồn tại sách bạn đang tìm kiếm
                    </Text>
                </View>
            )}

            {/* Hiển thị message thông báo */}
            <Snackbar
                className='pb-2 mt-[30px] absolute bottom-2 w-full'
                visible={!!message}
                onDismiss={onDismissSnackBar}
            >
                {message}
            </Snackbar>
        </SafeAreaView>
    )
}

export default SearchScreen
