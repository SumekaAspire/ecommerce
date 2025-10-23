import React from 'react';
import {View,Text, Image, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';
import { textData } from '../../constants/text';
import Wishlist from '../../components/Wishlist';
/**
 * Product Detail component
 * @param param0 route - used to pass parameters(here product data is passed as object)
 * so take product , object
 * @returns  detailed view of each product
 */
const ProductDetail = ({ route }: any) => {
  const { product } = route.params;
//   console.log('Product', product);

  return (
    <View style={styles.container}>
     <ScrollView contentContainerStyle={styles.container}>
         <Wishlist style={styles.wishlistIcon}/>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
     
       <View style={styles.detailsContainer}>
        <Text style ={styles.heading}>Product Description: </Text>
           <Text style={styles.description}> 
            {product.description || textData.description}
            </Text>
      
    
         <Text style ={styles.heading}>Product Details</Text>
           <Text style={styles.productDetails}>Category - {product.category}</Text>
           <Text style={styles.productDetails}>Rating - {product.rating.rate}</Text>
      </View>
     
    </ScrollView>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 5,
    // backgroundColor:'#ebb888ff'
   
    
  },
  image: {
    width: 350,
    height: 250,
    marginTop:30,
    borderRadius: 5,
    // borderColor: colors.grey,
    // borderWidth: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    marginBottom:20,
  },
  heading:{
    textAlign: 'left',
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom:5,
  },
  detailsContainer:{
    borderColor:colors.containerBorder,
    borderWidth:2,
    borderRadius:10,
    backgroundColor:colors.containerBackground,
    padding:10,
    margin:5,
  },
  productDetails: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 5,
  },
  price:{
    fontSize: 18,
    fontWeight:"bold",
    color: colors.ORANGE_COLOR,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: colors.black,
    marginBottom:20,
    marginTop: 5,
    fontWeight:'medium'
  },
   wishlistIcon:{
    top: 5,
    left:160,
   
 },
});
