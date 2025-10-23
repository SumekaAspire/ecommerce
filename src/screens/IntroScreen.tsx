import { View, Text, Image, StyleSheet} from 'react-native'
export const images = {
  sliderImage1: require('../assets/sliderImage1.png'),
  sliderImage2: require('../assets/sliderImage2.png'),
  sliderImage3: require('../assets/sliderImage3.png'),
  shoppingIcon: require('../assets/shoppingIcon.png'),
};
import React from 'react';
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
import { setUser } from '../store/slice/userSice';
import { storeData } from '../utils/asyncStorage';



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
    /**
     * Handles navigation To LoginScreen 
     * Triggers when user clicked continue button
     */
    const handleNavigationToLogin = async()=>{
         await storeData('introCompleted', true);
         dispatch(setUser(null));
         navigation.replace('Login');
    }
    
  return (
    <View style={styles.container}>
        <View style={styles.cartIcon}>
           <MaterialCommunityIcons name="cart-variant" color="#b45945ff" size={90} />
           <Text style={styles.greetingText}>{textData.welcome} <Text style={styles.appName}>{textData.ourMart}</Text>{textData.letShop}</Text>

        </View>

        <View style={styles.afterCartSection}>
            {/* <Image
              source={images.shoppingIcon}
              style={styles.image}
            /> */}

             {/* Render ImageSlider component - reusable component*/}    
             <ImageSlider 
             data={sliderData || []}
             autoPlay={true}
             autoPlayInterval={3000}
             sliderBoxHeight={300}
             horizontalPadding={40}   
            
             />
            {/* Button - reusable component, navigates to next screen*/}
            <Button text={textData.continue} onPress={handleNavigationToLogin} containerStyle={{ marginTop: 50 }}/>
        </View>
    </View>
  )
}

export default IntroScreen;

const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.PRIMARY_BACKGROUNDCOLOR,
        padding:20,

    },
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
        // borderWidth: 2,         // thickness
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
    }
})

