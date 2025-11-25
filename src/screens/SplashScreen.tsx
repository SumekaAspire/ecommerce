import React,{useEffect} from 'react';
import { View, Text ,StyleSheet,Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { images } from '../constants/image';
import {textData} from '../constants/text';
import { colors } from '../styles/colors';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { getData } from '../utils/asyncStorage';
import { setUser } from '../store/slices/userSlice';



/**
 * SplashScreen component for the application.
 * It displays app name, image and navigates to Intro screen after a delay of 5 seconds.
 * @returns rendered splash screen component
 */
const SplashScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(()=>{
  // /**
  //  * Timer is used to navigate to intro screen after a delay of 5 seconds.
  //  * Timer is cleared automatically when componnt unmounts - prevent memory leaks.
  //  */  
  //   const timer = setTimeout(()=>{
  //     navigation.replace("Intro")    
  //   },5000)
  //   return () => clearTimeout(timer);
  // },[])
  useEffect(()=>{
    const timer = setTimeout(async()=>{
       try{
        const savedUser = await getData('user');
        const introCompleted = await getData('introCompleted');

        if(!introCompleted){
          //navigate to introscreen if intro is not completed
          navigation.replace('Intro')
        }else if(savedUser){
          //if user exists, stored in redux and goes to home
          dispatch(setUser(savedUser));
          navigation.replace('HomeTab');
        }else{
          //if intro is completed but user is not logged in, goes to login
         navigation.replace('Login')
        }
      }catch(error){
         console.log('Error in checking login:', error);
         navigation.replace('Login');
      }
    }, 5000) //delay the splash
    return() => clearInterval(timer);
  },[navigation, dispatch]);
  return(
      <View style={styles.container}>
        <Text style={styles.text}>{textData.appName}</Text>
       <Image
        source={images.splashIcon}
        style={styles.image}
      />
    </View>
  )


}

export default SplashScreen;

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.PRIMARY_BACKGROUNDCOLOR,
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
      paddingBottom:10,
      color:colors.black,
      fontFamily:'Frijole',
      fontSize:50
    
    },
    image:{
        width:170,
        height:170,
        resizeMode:"cover",
        borderRadius:200
    }
})