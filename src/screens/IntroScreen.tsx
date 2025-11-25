import { View, Text, Image, StyleSheet} from 'react-native'
import React, { useState } from 'react';
import { images } from '../constants/image';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageSlider from '../components/ImageSlider';
import {textData} from '../constants/text';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { setUser } from '../store/slices/userSlice';
import { storeData } from '../utils/asyncStorage';
import LinkHandler from '../components/LinkHandler';

//Images for SiderView
const sliderData = [
  {
    img: images.sliderImage2
  },
  {
    img: images.sliderImage1
  },
  {
    img: images.sliderImage3,
  },
];

/**
 * Introscreen component for the application.
 * It displays cart image, greeting message, image slider and button navigates to Login screen after clicked the continue button.
 * @returns IntroScreen component
 */
const IntroScreen = () => {
   //Access the navigation object using the useNavaigation hook
    const navigation: any = useNavigation();
    const dispatch = useDispatch<AppDispatch>();
    const [activeIndex, setActiveIndex] = useState(0); //to track active slide index 

    /**
     * Skip - Handles navigation To LoginScreen 
     * Triggers when user clicked skip text
     */
    const handleNavigationToLogin = async()=>{
         await storeData('introCompleted', true);
         dispatch(setUser(null));
         navigation.replace('Login');
    }
    
  return (
    <View style={globalStyles.container}>
        <View style={styles.cartIcon}>
        {/* conditionally render skip button */}
        { activeIndex < sliderData.length-1 &&(
           <LinkHandler content="SKIP" onPress={handleNavigationToLogin} textStyle={styles.skip}/>
          )}
           <MaterialCommunityIcons name="cart-variant" color={colors.iconSkip} size={90} />
           <Text style={styles.greetingText}>{textData.welcome} <Text style={styles.appName}>{textData.ourMart}</Text>{textData.letShop}</Text>

        </View>

        <View style={styles.afterCartSection}>
             {/* Render ImageSlider component - reusable component*/}    
             <ImageSlider 
               data={sliderData || []}
              //  autoPlay={true}
              //  autoPlayInterval={3000}
               sliderBoxHeight={300}
               horizontalPadding={30}   
               onSlideChange={(index) =>  setActiveIndex(index)} //update activeIndex on slide change
             />
          
        </View>
    </View>
  )
}

export default IntroScreen;

const styles =StyleSheet.create({
    cartIcon:{
        alignItems: 'center',
        marginTop: 20,
    
    },
    greetingText:{
      textAlign:'center',
      color:'#0d0d0dff',
      fontSize:16,
      fontFamily:'AlanSans-Medium',
      marginTop:15,
      marginBottom:50
    
    },
     afterCartSection: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        // borderWidth: 2,      
        // borderColor: colors.ORANGE_COLOR, // color (same as button, you can change)
        // borderRadius: 12,        
    },     
    image:{
        width:310,
        height:300,
        marginBottom:100,    
    },
    appName:{
        fontFamily:'Figtree-ExtraBold',
    },
    skip:{
      left:150,
      fontFamily:'AlanSans-Medium',
      textAlign:'center',
      color:colors.iconSkip,
      fontSize:16,
      fontWeight:'bold' 
    }
})




