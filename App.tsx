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

// import {Platform} from 'react-native';
import { View, Text } from 'react-native'
import LoginScreeen from './screens/auth/Login'
import RegisterScreen from './screens/auth/Register'
import HomeScreen from './screens/Home'
import Footer from './components/Home/Footer'

function App(): JSX.Element {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <PaperProvider>
                    {/* <LoginScreeen /> */}
                    {/* <RegisterScreen /> */}
                    <Footer />
                </PaperProvider>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default App
