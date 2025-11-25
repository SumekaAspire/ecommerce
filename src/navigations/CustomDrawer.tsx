import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerContentScrollView } from "@react-navigation/drawer";


/**
 * Custom Drawer Component
 * @param  Naviagtion-  here navigations be used as props not import instead.
 * @param  state(current sttae of drawer navigation: details)- used to determine active route
 * @returns Custom Drawer UI and navigations
 */
const CustomDrawer = ({ navigation, state }: any) => {
  //state to toggle the visibility of submenu
  const [showSubmenu, setShowSubmenu] = useState(false);

  // To Get current active route name from the navigation state
  const activeRoute = state?.routeNames[state?.index];

  /**
   * DrawerItem Component- Helper to render a drawer item
   * @param label - Text label for the drawer item.
   * @param icon - Icon name for the drawer item (from Ionicons).
   * @param routeName -route name associated with the drawer item.
   * @param onPress - Function to handle the press event for navigation.
   * @returns A single drawer item with label, icon, and navigation functionality.
   */
  const DrawerItem = ({ label, icon, routeName, onPress }: any) => {
    //to check current route is active
    const isActive = activeRoute === routeName;
    return (
      <TouchableOpacity style={[styles.item, isActive && styles.activeItem]} onPress={onPress}>
        <Ionicons name={icon} size={22} color={isActive ? "green" : "#000"} //. change icon color based on active state
        />
        <Text style={[styles.label, { color: isActive ? "green" : "#000" }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <DrawerContentScrollView>
      <DrawerItem label="Home" icon="home-outline" routeName="Home"
        onPress={() => navigation.navigate("Home")}
      />
      <DrawerItem label="Profile" icon="person-outline" routeName="Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <DrawerItem label="Cart" icon="cart-outline" routeName="Cart"
        onPress={() => navigation.navigate("Cart")}
      />
      <DrawerItem label="Wishlist" icon="heart-outline" routeName="Wishlist"
        onPress={() => navigation.navigate("Wishlist")}
      />

      {/* Products main menu */}
      <View>
        <DrawerItem label="Products" icon="grid-outline" routeName="Products"
          onPress={() => navigation.navigate("Products")}
        />
        {/* arrow to show/hide submenu */}
        <TouchableOpacity style={styles.arrow} onPress={() => setShowSubmenu(!showSubmenu)} >
          <Ionicons name={showSubmenu ? "chevron-up-outline" : "chevron-down-outline"} size={20}/>
        </TouchableOpacity>
      </View>

      {/* Submenu */}
      {showSubmenu && (
        <View style={styles.submenuContainer}>
          <DrawerItem label="All Products" icon="bookmark-outline" routeName="ProductHome"
            onPress={() => navigation.navigate("SubMenu", { screen: "ProductHome" })}
          />
          <DrawerItem label="Electronics" icon="logo-electron" routeName="Electronics"
            onPress={() => navigation.navigate("SubMenu", { screen: "Electronics" })}
          />
          <DrawerItem label="Clothes" icon="accessibility-outline" routeName="Clothes"
            onPress={() => navigation.navigate("SubMenu", { screen: "Clothes" })}
          />
          <DrawerItem label="Furnitures" icon="construct-outline"routeName="Furnitures"
            onPress={() => navigation.navigate("SubMenu", { screen: "Furnitures" })}
          />
        </View>
      )}
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  activeItem: {
    backgroundColor: "#c6ccd7ff", 
    borderRadius: 8,
  },
  label: {
    marginLeft: 15,
    fontSize: 16,
  },
  arrow: {
    position: "absolute",
    right: 15,
    top: 12,
  },
  submenuContainer: {
    paddingLeft: 15,
    marginTop: 3,
  },
});






