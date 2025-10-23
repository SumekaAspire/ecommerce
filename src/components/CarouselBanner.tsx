import { View, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { banners } from '../mockdata/mockData'
import Carousel from 'react-native-reanimated-carousel'


//get screen with to ynamically calculate the carousel item width
const {width: screenWidth} = Dimensions.get('window');

//renders the data
const renderItem = ({ item }: { item: { id: number; image: string } }) => (
  <View key={item.id} style={styles.bannnerItemContainer}>
    <Image
      source={{ uri: item.image }}
      style={styles.bannerImageContainer}
      resizeMode='cover'
    />
  </View>
);

/**
 * CarouselComponent 
 * Displays a horizontal carousel of banners with autoplay functionality.
 * @returns CarouselBanner component
 */
const CarouselBanner = () => {
  return (
        <View>
              <Carousel
                width={screenWidth}
                height={180}
                autoPlay={true}
                autoPlayInterval={4000}
                data={banners}
                renderItem={renderItem} //function to render each item in a carousel
              />
        </View>
  )
}

export default CarouselBanner


const styles= StyleSheet.create({
    
    bannerImageContainer:{
        width:363,
        height:170,
        borderRadius:15,
        borderColor:"#888",
        borderWidth:2,
        backgroundColor: "#d2b4b4ff",

    },
    bannnerItemContainer:{  
        marginHorizontal:5,
       
    },

})





