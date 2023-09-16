/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react'
import { IconButton, PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'

import LoginScreen from './screens/auth/Login'
import RegisterScreen from './screens/auth/Register'
import BottomTabs from './components/Main/BottomTabs'
import Header from './components/Main/Header'
import DetailBook from './screens/DetailBook'
import Profile from './screens/Profile'
import HeaderDetail from './components/DetailBook/HeaderDetail'
import ProductDescription from './screens/DetailBook/ProductDescription'
import store from './redux/store'

// 8. test

const Stack = createNativeStackNavigator()

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <PaperProvider>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen
                                name='BottomTabs'
                                component={BottomTabs}
                                options={{
                                    headerTitle: (props) => <Header />,
                                    headerStyle: {
                                        backgroundColor: '#3b82f6',
                                    },
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name='Login'
                                component={LoginScreen}
                            />
                            <Stack.Screen
                                name='Register'
                                component={RegisterScreen}
                            />
                            <Stack.Screen
                                name='DetailBook'
                                component={DetailBook}
                                options={{
                                    header: HeaderDetail,
                                }}
                            />
                            <Stack.Screen
                                name='Profile'
                                component={Profile}
                                options={{
                                    headerTitle: 'Cập nhật thông tin',
                                }}
                            />
                            <Stack.Screen
                                name='ProductDescription'
                                component={ProductDescription}
                                options={({ navigation }) => ({
                                    title: 'Mô tả chi tiết',
                                    headerLeft: () => (
                                        <IconButton
                                            icon='close'
                                            onPress={() => navigation.goBack()}
                                        />
                                    ),
                                })}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </PaperProvider>
            </SafeAreaProvider>
        </Provider>
    )
}

export default App
