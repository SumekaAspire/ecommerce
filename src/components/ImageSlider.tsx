import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions, TouchableOpacity ,Text} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { colors } from "../styles/colors";
import Button from "./Button";
import { textData } from "../constants/text";
import LinkHandler from "./LinkHandler";
import { useNavigation } from "@react-navigation/native";
import { storeData } from "../utils/asyncStorage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setUser } from "../store/slice/userSice";

/**
 * type for ImageSlider
 */
type ImageSliderProps = {
  data: { img: any }[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  sliderBoxHeight?: number;
  horizontalPadding?: number;
};

const { width } = Dimensions.get("window");

/**Reusable component for Image Slider 
 *  React.FC<ImageSliderProps> - Standard way of mentioning component in typescript
*/
const ImageSlider: React.FC<ImageSliderProps> = ({
  data,
  autoPlay = true,
  autoPlayInterval = 2000,
  sliderBoxHeight = 300,
  horizontalPadding = 20, 
}) => {

  /**
   * Used useState to manage  dots slide to move according to image slide(auto play)
   * Carousel component updating the activeIndex whenever the slide autoplays to next slide.
   * onSnapToItem - callback will be triggered whenever the carousel slide to new item and update the activeIndex with the new index.
   * 
   */
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation: any = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const itemWidth = width - horizontalPadding * 2;

  //handle previous and Next buttons
  const handlePrev=()=>{
      if(activeIndex >0){
        setActiveIndex(activeIndex -1);
      }
  }
  const handleNext =() =>{
       if(activeIndex < data.length-1){
      setActiveIndex(activeIndex +1);
     }

  }

  const handleNavigationToLogin= async() =>{
     if(activeIndex === data.length - 1){
         await storeData('introCompleted', true);
         dispatch(setUser(null));
         navigation.replace('Login');
     }
  }

  return (
    <View style={styles.container}>
      <Carousel
        key={activeIndex} //force carousel component re-render whenever the activeIndex change
        defaultIndex={activeIndex} // sets the initial index of carousel when it is first rendered, not dynamically update the carousel position after initial render
        width={itemWidth}
        height={sliderBoxHeight}
        data={data || []}  //carousel component receives a valid array, if data prop is undefined, null, not provided
        //autoPlay={autoPlay}
        //autoPlayInterval={autoPlayInterval}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <Image
            // source={typeof item.img === "string" ? { uri: item.img } : item.img}
            source={item.img}
            style={[styles.image, { width: itemWidth, height: sliderBoxHeight }]}
          />
        )}
      />

      {/* Dots below the Image Slider */}
      <View style={styles.dotsContainer}>
        {/* ?.- calls only data exits , if data is undefined or null, instead of crash it shows undefined */}
        {data?.map((item, index) => ( 
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
         
        ))}
         
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
         style={[styles.buttons, activeIndex === 0 && styles.disabledButton]}
         onPress={handlePrev}
         disabled={activeIndex ===0}> 
        {/* logically disables button(preventing onPress event) and using styles ui also changed */}
          <Text style={styles.buttonText}>{textData.previous}</Text>
        </TouchableOpacity>

        {/* <LinkHandler
         content={textData.previous}
         textStyle={styles.buttonText}
         viewStyle={[styles.buttons, activeIndex === 0 && styles.disabledButton]}
         onPress={handlePrev}
         disabled={activeIndex ===0} // logically disables button(preventing onPress event) and using styles ui also changed 
        
        /> */}
         {activeIndex < data.length- 1 ?  
          <LinkHandler content={textData.next}  onPress={handleNext} textStyle={styles.buttonText} viewStyle={styles.buttons} />
            : 
          <LinkHandler content={textData.continue} onPress={handleNavigationToLogin} textStyle={styles.buttonText} viewStyle={styles.buttons} />
        }
      </View>   
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    resizeMode: "cover",
   // borderRadius: 10,borderWidth:1,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30, 
  },
  dot: {
    marginHorizontal: 5,
  },
  activeDot: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor:colors.orange,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.inActive,
  },
  buttons: {
    padding: 10,
    backgroundColor: colors.orange,
    borderRadius: 20,
    width:"32%",
    height:42,
  },
  navigationContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'95%',
    marginVertical:60,
  },
  buttonText:{
    textAlign:'center',
    fontFamily:"AlanSans-Medium",
    fontSize:16,
    color:colors.white

  },
  disabledButton:{
    backgroundColor:colors.inActive,
  },
});

