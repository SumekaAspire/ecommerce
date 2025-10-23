import { View, Text, ScrollView, Image, StyleSheet ,FlatList,Dimensions} from 'react-native'
import React from 'react'
import { banner,banners, categories } from '../../mockdata/mockData';
import Carousel from 'react-native-reanimated-carousel'
import ProductList from './ProductList';

/**
 * ProductCategory component -displays the product category list in horizontal 
 * @returns ProductCategory component
 */
const ProductCategory:React.FC = () => {
    return(
        <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) =>item.id.toString()}
        renderItem={({item}) => (
            <View style={styles.itemContainer}>
                <Image
                   source={{uri: item.image}}
                   style={styles.imageContainer}
                   resizeMode='cover'
                />
                <Text style={styles.itemText}>{item.name}</Text>
            </View>
        )}
        />
    )
}


//get screen with to ynamically calculate the carousel item width
const {width: screenWidth} = Dimensions.get('window');

//renders the data
const renderItem = ({ item }: { item: { id: number; image: string } }) => (
  <View key={item.id} style={styles.carouselBannerItemContainer}>
    <Image
      source={{ uri: item.image }}
      style={styles.carouselBannerContainer}
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

/**
 * Displays the banners in horizontal
 * @returns Banners component
 */
const BannerScroll:React.FC= () => {
    return(   
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={banner}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
            <View style={styles.bannnerItemContainer}>
                <Image
                    source={{uri: item.image}}
                    style={styles.bannerImageContainer}
                    resizeMode='cover'
                />
            </View>
        )}
     />
    )
}

//HomeBanners component
const HomeBanners: React.FC = () => {
    return(
        <View style={styles.homeScreenContainer}>
            <ProductCategory />
             <CarouselBanner/>
             <BannerScroll/>
           
        </View>
    )
}
export default HomeBanners



const styles= StyleSheet.create({
    homeScreenContainer:{
        backgroundColor:"#f2eeeeff",
        marginHorizontal:10,
    },
    imageContainer:{
        width:65,
        height:65,
        borderRadius:50,
        borderColor:"#888",
        borderWidth:2,
        backgroundColor: "#d2b4b4ff",

    },
    itemContainer:{
        marginHorizontal:5,
        marginBottom:10,
    },
    itemText:{
        fontSize:13,
        textAlign:"center",
        color:"#888",
        fontWeight:"bold"

    },
    bannerImageContainer:{
        width:270,
        height:150,
        borderRadius:15,
        borderColor:"#888",
        borderWidth:2,
        backgroundColor: "#d2b4b4ff",
        marginRight:5

    },
    bannnerItemContainer:{  
        marginHorizontal:5,
        // marginVertical:10
    },
     carouselBannerContainer:{
        width:363,
        height:170,
        borderRadius:15,
        borderColor:"#888",
        borderWidth:2,
        backgroundColor: "#d2b4b4ff",

    },
    carouselBannerItemContainer:{  
        marginHorizontal:5,
       
    },


})





