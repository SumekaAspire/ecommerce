import { View, Text,StyleSheet} from 'react-native'
import React,{useEffect,useState} from 'react'
import Login from './src/screens/AuthScreen/Login'
import SplashScreen from './src/screens/SplashScreen'
import HomeScreen from './src/screens/HomeScreen/HomeScreen'
import SignUp from './src/screens/AuthScreen/SignUp'
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { store } from './src/store/store'
import { Provider } from 'react-redux'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AuthNavigation from './src/navigations/AuthNavigation'

const App = () => {
    
    return (
      <GestureHandlerRootView>
        <SafeAreaProvider>
           <Provider store={store}>
             <AuthNavigation />
             <Toast />
           </Provider>

        </SafeAreaProvider>
      </GestureHandlerRootView>
  
    )
    
}

export default App

// const styles= StyleSheet.create({
//     container:{
//         flex:1,
//         backgroundColor:"white",
//         alignItems:"center",
//         justifyContent:"center"
//     },
   
// })