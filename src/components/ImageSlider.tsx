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
import { setUser } from "../store/slices/userSlice";

/**
 * type for ImageSlider
 */
type ImageSliderProps = {
  data: { img: any }[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  sliderBoxHeight?: number;
  horizontalPadding?: number;
  onSlideChange?: (index:number) =>void; // for slide change callback
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
  onSlideChange,
}) => {

  /**
   * Used useState to manage  dots slide to move according to image slide(auto play)/ manually
   * Carousel component updating the activeIndex whenever the slide autoplays/manully to next slide.
   * onSnapToItem(for swipe changes- index updated) - callback will be triggered whenever the carousel slide to new item and update the activeIndex with the new index.
   * 
   */
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation: any = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const itemWidth = width - horizontalPadding * 2;

  //handle previous and Next buttons, navigate to login as continue button
  const handlePrev=()=>{
      if(activeIndex >0){
        setActiveIndex(activeIndex -1);
        onSlideChange?.(activeIndex - 1);
      }
  }
  const handleNext =() =>{
       if(activeIndex < data.length-1){
      setActiveIndex(activeIndex +1);
      onSlideChange?.(activeIndex + 1); //condition - if onSlideChange(index changed means)
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
        // onSnapToItem={(index) => {
        //   setActiveIndex(index);
        // }} // if enabled means can swipe to every image slide(3 to 1 also happen), but prev, next buttons handled manually
        enabled={false} // to disable swipe gesture in carousel, if true(can swipe, images only changed not dots, for dots have to enable onSnapItem)

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
        {/* first slide */}
        {activeIndex === 0 &&(
         <LinkHandler  content={textData.next}  onPress={handleNext} textStyle={styles.buttonText} viewStyle={styles.buttons} />
        )}
        {/* middle slides */}
        {activeIndex >0 && activeIndex < data.length-1 &&(
          <>
          <LinkHandler content={textData.previous}  onPress={handlePrev} textStyle={styles.buttonText} viewStyle={styles.buttons} />
            <LinkHandler  content={textData.next}  onPress={handleNext} textStyle={styles.buttonText} viewStyle={styles.buttons} />
          </>
        )}
        {/* last slide */}
        {activeIndex === data.length-1 && (
          <>
          <LinkHandler content={textData.continue}  onPress={handleNavigationToLogin} textStyle={styles.buttonText} viewStyle={styles.buttons} />
          </>
        )}
        
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
    marginTop: 40, 
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
    width:120,
    height:42,
    marginTop:50,
    alignSelf:'flex-end'  // align the button to right
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



