import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import ProductList from '../../components/Home/ProductList'

const HomeTabs = createMaterialTopTabNavigator()

const tabBarList = [
    {
        _id: 1,
        title: 'Tất cả',
        param: 'all',
    },
    {
        _id: 2,
        title: 'Văn học trong nước',
        param: 'domestic_literature',
    },
    {
        _id: 3,
        title: 'Văn học nước ngoài',
        param: 'foreign_literature',
    },
    {
        _id: 4,
        title: 'Kinh tế',
        param: 'economy',
    },
    {
        _id: 5,
        title: 'Tâm lý giáo dục',
        param: 'educational_psychology',
    },
    {
        _id: 6,
        title: 'Triết học',
        param: 'philosophy',
    },
    {
        _id: 7,
        title: 'Tôn giáo',
        param: 'religion',
    },
    {
        _id: 8,
        title: 'Truyện',
        param: 'comic',
    },
    {
        _id: 9,
        title: 'Lịch sử - Địa lý',
        param: 'history_geography',
    },
    {
        _id: 10,
        title: 'Khoa học',
        param: 'science',
    },
]

const data = [
    {
        _id: 1,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
    {
        _id: 2,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
    {
        _id: 3,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
    {
        _id: 4,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
    {
        _id: 5,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
    {
        _id: 6,
        name: '3 người thầy vĩ đại',
        author: 'Robin Sharma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhxU1ec0Q7O0_sgstq6gF_c6XVsrNjLGtnw&usqp=CAU',
    },
]

const HomeScreen = ({ navigation }: any) => {
    return (
        <HomeTabs.Navigator
            screenOptions={{
                tabBarScrollEnabled: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    width: 90,
                },
                tabBarGap: 2,
                tabBarItemStyle: {
                    width: 120,
                },
            }}
        >
            {tabBarList.map((item) => (
                <HomeTabs.Screen key={item._id} name={item.title}>
                    {() => (
                        <GestureHandlerRootView>
                            <ProductList category={item.param} data={data} />
                        </GestureHandlerRootView>
                    )}
                </HomeTabs.Screen>
            ))}
        </HomeTabs.Navigator>
    )
}

export default HomeScreen
