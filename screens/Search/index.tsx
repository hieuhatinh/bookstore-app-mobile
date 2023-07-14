import { useState } from 'react'
import { View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import ProductList from '../../components/Home/ProductList'

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
    const [searchQuery, setSearchQuery] = useState('')

    const onChangeSearch = (query: string) => setSearchQuery(query)

    return (
        <View>
            <Searchbar
                placeholder='Tìm kiếm theo tên sách, tên tác giả'
                onChangeText={onChangeSearch}
                value={searchQuery}
                className='m-2'
            />
            <GestureHandlerRootView>
                <ProductList
                    data={data}
                    category={null}
                    navigation={navigation}
                />
            </GestureHandlerRootView>
        </View>
    )
}

export default SearchScreen
