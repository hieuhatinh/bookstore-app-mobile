/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
// import {Platform} from 'react-native';
import { View, Text } from 'react-native'
import LoginScreeen from './screens/auth/Login'
import RegisterScreen from './screens/auth/Register'

function App(): JSX.Element {
    return (
        <SafeAreaProvider>
            <PaperProvider>
                {/* <LoginScreeen /> */}
                <RegisterScreen />
            </PaperProvider>
        </SafeAreaProvider>
    )
}

export default App
