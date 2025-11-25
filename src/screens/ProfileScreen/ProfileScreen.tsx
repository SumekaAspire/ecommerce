import { View, Text,StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native'
import React from 'react'
import LinkHandler from '../../components/LinkHandler'
import { removeData } from '../../utils/asyncStorage'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { clearUser, selectUser } from "../../store/slices/userSlice"
import { AppDispatch } from '../../store/store'
import { images } from '../../constants/image'
import { globalStyles } from '../../styles/globalStyles'
import { colors } from '../../styles/colors'
import Button from '../../components/Button'
import { textData } from '../../constants/text'
import { profileInfo } from '../../mockdata/mockData'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

/**
 * ProfileScreen Component 
 * logout - clear data for async storage
 * @returns  Profile UI - Account Overview and Logout Button 
 * 
 */
const ProfileScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation: any = useNavigation();
  const user = useSelector(selectUser);
   
// handle logout
  const handleLogout= async() =>{
     await removeData('user');
     await removeData('introCompleted'); 
     dispatch(clearUser());
     navigation.reset({index:0, routes:[{name: "Login"}],
    })
  }
  const handleNavigate=(item:any)=>{
     navigation.navigate(item.routeName)
  }
  return (
   <View style={globalStyles.container}>
      <View style={styles.container}>
       <Image source={images.shoppingIcon} style={styles.profileImage} />
       <Text style={styles.welcomeText}>{textData.profileWelcome}{user?.name || 'User'} !</Text>
       <Text style={styles.emailText}>Email: {user?.email || "user@gmail.com"}</Text>
      </View>
      <Text style={styles.accountText}>{textData.accountInformation}</Text>
      <View style={styles.accountInfoContainer}>
      <FlatList
         data={profileInfo}
         keyExtractor={(item) => item.id}
         renderItem={({item}) =>(
           <View>
         {/* <TouchableOpacity onPress={handleNavigate} >
              <Ionicons name={item.iconName} size={22} color={colors.black} />
              <Text>{item.category}</Text>
              <View  style={styles.accountInfoCategory}>
                  <MaterialIcons name="keyboard-arrow-right" color="#000" size={24} />
              </View> 
            </TouchableOpacity> */}
            <LinkHandler content={item.category} iconComponent={ <MaterialIcons name="keyboard-arrow-right" color="#000" size={24} />} viewStyle={styles.accountInfoCategory}  onPress={() => handleNavigate(item)}/>
         </View> 
        )}
      />
      </View>
        {/* <LinkHandler content="Logout" onPress={handleLogout} textStyle={styles.textLogout}/> */}
      <Button text={textData.logout} onPress={handleLogout} containerStyle={{alignItems:'center'}}/> 
      </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container:{
    alignItems:"center" ,
    justifyContent:"center" ,
  
  },
  accountText:{
    textAlign:"left",
    fontFamily:"Figtree-Black",
    marginBottom:10
  },
   textLogout: {
    color: colors.black,
    fontFamily: "AlanSans-SemiBold",
    textAlign:"center",
    marginBottom: 50,
    marginTop:20,   
  },
  profileImage:{
    borderRadius:100,
    borderWidth:2,
    width:70,
    height:70,
    marginBottom:10, 
    marginTop:10,
    borderColor:colors.grey,
    backgroundColor:colors.grey,
   
  },
  welcomeText:{
    color: colors.black,
    fontFamily: "AlanSans-SemiBold",
    marginBottom: 10,
    textAlign:"center"
    
  },
  emailText:{
    marginBottom:10,
  },
  accountInfoContainer:{
    backgroundColor:colors.lightGrey,
    borderRadius:10,
    marginBottom: 15,
    padding:10,

  },accountInfoCategory:{
    marginBottom: 5,
    flexDirection:'row',
    justifyContent:'space-between'

  }

})