/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState } from 'react'
import { IconButton, PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import {Platform} from 'react-native';
import LoginScreen from './screens/auth/Login'
import RegisterScreen from './screens/auth/Register'
import BottomTabs from './components/Main/BottomTabs'
import Header from './components/Main/Header'
import DetailBook from './screens/DetailBook'
import Profile from './screens/Profile'
import HeaderDetail from './components/DetailBook/HeaderDetail'
import ProductDescription from './screens/DetailBook/ProductDescription'
import LoadingLogout from './screens/Account/LoadingLogout'

const Stack = createNativeStackNavigator()

function App(): JSX.Element {
    const [headerTransparent, setHeaderTransparent] = useState(true)

    return (
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
                        <Stack.Screen name='Login' component={LoginScreen} />
                        <Stack.Screen
                            name='Register'
                            component={RegisterScreen}
                        />
                        <Stack.Screen
                            name='DetailBook'
                            component={DetailBook}
                            options={{
                                headerBackVisible: true,
                                // headerTransparent: headerTransparent,
                                headerTitleAlign: 'left',
                                title: '',
                                headerRight: (props) => <HeaderDetail />,
                            }}
                        />
                        <Stack.Screen name='Profile' component={Profile} />
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

                        {/* Loading */}
                        <Stack.Screen
                            name='LoadingLogout'
                            component={LoadingLogout}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaProvider>
    )
}

export default App
