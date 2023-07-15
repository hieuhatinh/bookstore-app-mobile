import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import ProductList from '../../components/Home/ProductList'

const HomeTabs = createMaterialTopTabNavigator()

const tabBarList = [
    {
        id: 1,
        title: 'Tất cả',
        param: 'all',
    },
    {
        id: 2,
        title: 'Văn học trong nước',
        param: 'domestic_literature',
    },
    {
        id: 3,
        title: 'Văn học nước ngoài',
        param: 'foreign_literature',
    },
    {
        id: 4,
        title: 'Kinh tế',
        param: 'economy',
    },
    {
        id: 5,
        title: 'Tâm lý giáo dục',
        param: 'educational_psychology',
    },
    {
        id: 6,
        title: 'Triết học',
        param: 'philosophy',
    },
    {
        id: 7,
        title: 'Tôn giáo',
        param: 'religion',
    },
    {
        id: 8,
        title: 'Truyện',
        param: 'comic',
    },
    {
        id: 9,
        title: 'Lịch sử - Địa lý',
        param: 'history_geography',
    },
    {
        id: 10,
        title: 'Khoa học',
        param: 'science',
    },
]

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
                <HomeTabs.Screen key={item.id} name={item.title}>
                    {() => (
                        <GestureHandlerRootView>
                            <ProductList
                                category={item.param}
                                data={data}
                                navigation={navigation}
                            />
                        </GestureHandlerRootView>
                    )}
                </HomeTabs.Screen>
            ))}
        </HomeTabs.Navigator>
    )
}

export default HomeScreen
