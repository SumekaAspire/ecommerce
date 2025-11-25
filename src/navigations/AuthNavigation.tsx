import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignUp from '../screens/AuthScreen/SignUp';
import Login from '../screens/AuthScreen/Login';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';
import ProductDetail from '../screens/Products/ProductDetail';
import ProductList from '../screens/HomeScreen/ProductList';
import ShoppingCart from '../screens/CheckoutScreen/ShoppingCart';
import CheckoutPage from '../screens/CheckoutScreen/CheckoutPage';
import WishlistScreen from '../screens/WishlistScreen/WishlistScreen';
import ProductsStack from './ProductsStack';
import AppNavigation from './AppNavigation';
import AccountInfo from '../screens/ProfileScreen/AccountInfo';
import FeedBack from '../screens/CheckoutScreen/FeedBack';


/**
 * Defined Types for navigation stack
 * Each key represents screen name, value represents type of parameters passed to that screen.
 * If no parameters passed, value is undefined.
 */
export type NavStack={
  Splash: undefined;
  Intro: undefined;
  SignUp: undefined;
  Login: undefined;
  Home: undefined;
  HomeTab: undefined;
  ProductDetail: undefined;
  ProductList: undefined;
  ShoppingCart: undefined;
  CheckOut: undefined;
  AccountInfo: undefined;
  FeedBack:undefined;

}

//create stack navigator with the defined type
const Stack = createNativeStackNavigator<NavStack>();

/**
 * AuthNavigation component
 * setup navigation structure for the application with screens and respective components, as well as initial route
 * @returns Navigation container with navigation stack
 */
const AuthNavigation = () => {
   
return (
 <NavigationContainer>
  <Stack.Navigator initialRouteName="HomeTab" screenOptions={{headerShown:false}}>
   <Stack.Screen name='Splash' component={SplashScreen} />
   <Stack.Screen name="Intro" component={IntroScreen} />
   <Stack.Screen name="SignUp" component={SignUp} />
   <Stack.Screen name="Login" component={Login} />

   <Stack.Screen name="HomeTab" component={AppNavigation}/>
   <Stack.Screen name="ShoppingCart" component={ShoppingCart} options={{headerShown: true, title:"Cart"}}/>
  
   <Stack.Screen name='ProductList' component={ProductList}  options={{ headerShown: true, title: 'Products' }}/>
   <Stack.Screen  name="ProductDetail" component={ProductDetail}options={{ headerShown: true, title: 'Product Detail' }} />
   <Stack.Screen name="CheckOut"  component={CheckoutPage}options={{ headerShown: true, title: 'CheckOut' }} />
   <Stack.Screen name="AccountInfo"  component={AccountInfo}options={{ headerShown: true, title: 'Personal Information' }} />
   <Stack.Screen name="FeedBack" component={FeedBack} />


  </Stack.Navigator>

</NavigationContainer>
  );
}

export default AuthNavigation