import { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native'

import ProductList from '../../components/Home/ProductList'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const data = [
    {
        id: 1,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
    {
        id: 2,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
    {
        id: 3,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
    {
        id: 4,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
    {
        id: 5,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
    {
        id: 6,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
    {
        id: 7,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
]

const SearchScreen = ({ navigation }: any) => {
    const insets = useSafeAreaInsets()
    const [searchQuery, setSearchQuery] = useState('')

    const onChangeSearch = (query: string) => setSearchQuery(query)

    return (
        <SafeAreaView style={{ paddingBottom: insets.bottom + 150 }}>
            <Searchbar
                placeholder='Tìm kiếm theo tên sách, tên tác giả'
                onChangeText={onChangeSearch}
                value={searchQuery}
                className='m-2 bg-white'
            />
            <GestureHandlerRootView>
                <ProductList
                    data={data}
                    category={null}
                    navigation={navigation}
                />
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}

export default SearchScreen
