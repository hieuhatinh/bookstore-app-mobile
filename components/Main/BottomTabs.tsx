import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeScreen from '../../screens/Home'
import SearchScreen from '../../screens/Search'
import CartScreen from '../../screens/Cart'
import AccountScreen from '../../screens/Account'

const Tab = createMaterialBottomTabNavigator()

const BottomTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            activeColor='#3b82f6'
            inactiveColor='#3e2465'
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => {
                        return <Icon name='home' size={25} color={color} />
                    },
                    title: 'BookStore App',
                }}
            />
            <Tab.Screen
                name='Search'
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => {
                        return <Icon name='magnify' size={25} color={color} />
                    },
                    title: 'Search',
                }}
            />
            <Tab.Screen
                name='Cart'
                component={CartScreen}
                options={{
                    tabBarLabel: 'Cart',
                    tabBarIcon: ({ color }) => {
                        return (
                            <Icon name='cart-variant' size={25} color={color} />
                        )
                    },
                }}
            />
            <Tab.Screen
                name='Account'
                component={AccountScreen}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color }) => {
                        return <Icon name='account' size={25} color={color} />
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabs
