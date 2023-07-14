import ResultRender from '../../components/Home/ResultRender'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const HomeTabs = createMaterialTopTabNavigator()

const tabBarList = [
    {
        id: 1,
        title: 'Tất cả',
    },
    {
        id: 2,
        title: 'Văn học trong nước',
    },
    {
        id: 3,
        title: 'Văn học nước ngoài',
    },
    {
        id: 4,
        title: 'Kinh tế',
    },
    {
        id: 5,
        title: 'Tâm lý giáo dục',
    },
    {
        id: 6,
        title: 'Triết học',
    },
    {
        id: 7,
        title: 'Tôn giáo',
    },
    {
        id: 8,
        title: 'Truyện',
    },
    {
        id: 9,
        title: 'Lịch sử - Địa lý',
    },
    {
        id: 10,
        title: 'Khoa học',
    },
]

const HomeScreen = () => {
    return (
        <HomeTabs.Navigator
            screenOptions={{
                tabBarScrollEnabled: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    width: 90,
                },
            }}
        >
            {tabBarList.map((item) => (
                <HomeTabs.Screen
                    key={item.id}
                    name={item.title}
                    component={ResultRender}
                />
            ))}
        </HomeTabs.Navigator>
    )
}

export default HomeScreen
