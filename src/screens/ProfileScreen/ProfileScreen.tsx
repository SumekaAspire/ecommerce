import { View, Text,StyleSheet} from 'react-native'
import React from 'react'
import LinkHandler from '../../components/LinkHandler'
import { removeData } from '../../utils/asyncStorage'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { clearUser, selectUser } from "../../store/slice/userSice"
import { AppDispatch } from '../../store/store'




/**
 * ProfileScreen Component
 * 
 */
const ProfileScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation: any = useNavigation();
  const user = useSelector(selectUser);

  const handleLogout= async() =>{
     await removeData('user');
     await removeData('introCompleted'); 
     dispatch(clearUser());
     navigation.reset({index:0, routes:[{name: "Login"}],
    })
  }
  return (
    <View>
      <Text>Profile</Text>
      <Text>Welcome,{user?.name || 'User'} !</Text>
      <LinkHandler content="Logout" onPress={handleLogout} textStyle={styles.textLogout}/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
   textLogout: {
    color: "#1c1b1bff",
    fontFamily: "AlanSans-SemiBold",
    left:20,
    marginBottom: 50,
  },
})