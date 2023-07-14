/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import {Platform} from 'react-native';
import LoginScreen from './screens/auth/Login'
import RegisterScreen from './screens/auth/Register'
import BottomTabs from './components/Main/BottomTabs'
import Header from './components/Main/Header'

const Stack = createNativeStackNavigator()

function App(): JSX.Element {
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
                            }}
                        />
                        <Stack.Screen name='Login' component={LoginScreen} />
                        <Stack.Screen
                            name='Register'
                            component={RegisterScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaProvider>
    )
}

export default App
