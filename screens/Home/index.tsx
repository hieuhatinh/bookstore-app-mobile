import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Category from '../../components/Home/Category'

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
                <HomeTabs.Screen
                    key={item._id}
                    name={item.title}
                    children={() => <Category category={item.param} />}
                />
            ))}
        </HomeTabs.Navigator>
    )
}

export default HomeScreen
