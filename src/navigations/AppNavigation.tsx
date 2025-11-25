import React from 'react'
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import AboutContent from '../screens/AboutScreen/AboutContent';
import Products from '../screens/Products/Products';
import WishlistScreen from '../screens/WishlistScreen/WishlistScreen';
import ShoppingCart from '../screens/CheckoutScreen/ShoppingCart';
import ProductsStack from './ProductsStack';
import CustomDrawer from './CustomDrawer';

//Type for Drawer navigator
export type DrawerStack={
  Home:undefined;
  Profile: undefined;
  About: undefined;
  Products: undefined;
  Wishlist: undefined;
  Cart:undefined;
  SubMenu: undefined;
}

/**
 * Drawer Navigation - shows component like Menu
 * now created custom drawer with icons and submenus
 * if use custom drawer , activetintcolor,activebackgroundcolor,inactivecolor not work
 * @returns DrawerNavigation Component
 */
const AppNavigation = () => {

    const Drawer = createDrawerNavigator<DrawerStack>();
  return (
     <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawer {...props} />} // pass props - React Navigation automatically passes navigation, state, and descriptors to the custom drawer component.
      screenOptions={{ headerShown: true , drawerType:"front",
        drawerStyle: {backgroundColor: '#e7e8efff', width: 300,},
        // drawerActiveBackgroundColor: '#a7abb2ff', drawerActiveTintColor: 'green',drawerInactiveTintColor: '#ae4646ff', //using Custom Drawer these are not worked
      }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen}/>
        <Drawer.Screen name="About" component={AboutContent} />
        <Drawer.Screen name="Products" component={Products} />
        <Drawer.Screen name="SubMenu" component={ProductsStack}  options={{headerShown:false}}/>
        <Drawer.Screen name="Wishlist" component={WishlistScreen}/>
        <Drawer.Screen name="Cart" component={ShoppingCart}/>
        
    </Drawer.Navigator>
  )
}

export default AppNavigation




















// import { createDrawerNavigator} from '@react-navigation/drawer';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import HomeScreen from '../screens/HomeScreen/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
// import AboutContent from '../screens/AboutScreen/AboutContent';
// import Products from '../screens/Products/Products';
// import React from 'react';

// //Type for Drawer Navigator
// export type DrawerStack = {
//   Home: undefined;
//   Profile: undefined;
//   About: undefined;
//   Products: undefined;
// //   Electronics: undefined;
// //   Clothing: undefined;
// };

// //create drawer navigator with the defined type
// const Drawer = createDrawerNavigator<DrawerStack>();

// /**
//  * Drawer Navigation - shows component like Menu
//  * @returns DrawerNavigation Component
//  */
// const DrawerNavigation = () => {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: true,
//         drawerType: 'front',
//         drawerActiveTintColor: '#e91e63',
//         drawerInactiveTintColor: '#555',
//         drawerActiveBackgroundColor: '#bcd9b0ff',
//         drawerInactiveBackgroundColor: 'transparent',
    
//       }}
//     >
//       <Drawer.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           drawerIcon: () => (
//             <Ionicons name="home-outline" size={28} color="#111211ff" />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           drawerIcon: () => (
//             <Ionicons name="person-outline" size={28} color="#111211ff" />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="About"
//         component={AboutContent}
//         options={{
//           drawerIcon: () => (
//             <Ionicons name="information-circle-outline" size={30} color="#111211ff" />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Products"
//         component={Products}
//         options={{
//           drawerIcon: () => (
//             <Ionicons name="cart-outline" size={22} color="#111211ff"/>
//           ),
//         }}
//       />
      
//     </Drawer.Navigator>
//   );
// };

// export default DrawerNavigation;








