import React, { useState } from 'react';
import {View,Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { colors } from '../../styles/colors';
import { textData } from '../../constants/text';
import Wishlist from '../../components/Wishlist';
import { productCardView } from '../../styles/globalStyles';
import LinkHandler from '../../components/LinkHandler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ratings from '../../components/RatingsComponent';
import RatingsComponent from '../../components/RatingsComponent';
/**
 * Product Detail component
 * @param param0 route - used to pass parameters(here product data is passed as object)
 * so take product , object
 * @returns  detailed view of each product
 */
const ProductDetail = ({ route }: any) => {
  const { product } = route.params;
  //   console.log('Product', product);
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);

//handle decrase and increase button
  const increaseBtn=()=>{
    setQuantity(quantity+1);
  }
  const decreaseBtn=()=>{
    if(quantity>1){
      setQuantity(quantity-1)
    }
  }
  const handleAddToCart=()=>{
    //dispatch action to add product to cart
         dispatch(addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity,
          image:product.image,
         }))
         navigation.navigate('ShoppingCart');
  }
  // toggle the detailed image view
  const toggleModal =()=>{
    setModalVisible(!isModalVisible);
  }

  return (
   <View style={styles.container}>
     <ScrollView  showsVerticalScrollIndicator={false}>
       {/* Image section */}
       <View style={styles.imageContainer}>
        <TouchableOpacity onPress={toggleModal}>
           <View style={styles.imageWrapper}>
            <Image source={{uri:product.image}} style={styles.image} resizeMode='contain'/>
            <View style={styles.wishlistIcon}>
              <Wishlist product={product}/>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible} transparent={false} animationType='fade'>
        <View style= {styles.modalContainer}>
          <LinkHandler iconComponent={ <Ionicons name={textData.closeIcon} size={24} color={colors.black} />} onPress={toggleModal} textStyle={styles.modalCloseText} viewStyle={styles.modalCloseButton}/>
          <Image source={{uri: product.image}} style={styles.modalImage} resizeMode='contain'/>
        </View>
      </Modal>
       {/* Product info section */}
      <View style={styles.productInfoContainer}>
          <Text style={styles.title}>{product.title}</Text>
          {/* Price and Quantity */}
          <View style={styles.priceQuantity}>
            <Text style={styles.price}>₹{product.price}</Text>
            <View style={styles.quantityContainer}>
             <LinkHandler onPress={decreaseBtn} content={textData.decrease} viewStyle={styles.buttonQuantity} textStyle={styles.quantityBtnText}/>
              <Text style={styles.quantityText}>{quantity}</Text>
             <LinkHandler onPress={increaseBtn} content={textData.increase} viewStyle={styles.buttonQuantity} textStyle={styles.quantityBtnText}/>
           </View>
          </View>

           {/* Divider */}
          <View style={styles.divider}/>
          {/* Product Description and details */}
          <Text style ={styles.heading}>{textData.productDescription} </Text>
          <View style={styles.productDetailsContainer}>
             <Text style={styles.description}>{product.description}</Text>
          </View>

          <Text style ={styles.heading}>{textData.productDetails}</Text>
          <View style={styles.productDetailsContainer}>
             <Text style={styles.productDetailsText}>{textData.category} {product.category}</Text>
             <Text style={styles.productDetailsText}>{textData.ratings} {product.rating.rate}</Text>
             <Text style={styles.productDetailsText}>{textData.reviewCount} {product.rating.count} {textData.reviews}</Text>
          </View>
          {/* ratings */}
          <Text style ={styles.heading}>{textData.provideRatings}</Text><RatingsComponent/>
          {/* Add to cart */}
          <LinkHandler  onPress={handleAddToCart} content={textData.addToCart} viewStyle={productCardView.cartButton} textStyle={productCardView.cartBtnText}/>
       </View>  
     </ScrollView>    
    </View>
  );
};
export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.white     
  },
  imageContainer:{
    backgroundColor: colors.white,//padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper:{
    backgroundColor: colors.white, //borderRadius: 15,
    padding: 15,
    elevation: 3,
    shadowColor: colors.black,
    position: 'relative',
  },
  image: {
    width: 350,
    height: 250,
    marginTop:30,//backgroundColor:"#b38484ff",//borderRadius: 5,// borderColor: colors.grey, // borderWidth: 2,
    marginBottom:15
  },
   wishlistIcon:{
    position: 'absolute',
    top: 15,
    right: 15
 },
  productInfoContainer:{
    flex: 2,
    backgroundColor: colors.productInfoContainer,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    padding: 15,
  },  
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginBottom:10,
  },
  priceQuantity:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price:{
    fontSize: 18,
    fontWeight:"bold",
    color: colors.ORANGE_COLOR,   
  },
  quantityContainer:{
    flexDirection: 'row',
    alignItems: 'center', 
  },
  buttonQuantity:{
    backgroundColor: colors.grey,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2, 
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: colors.black,
  },
  quantityBtnText:{
   fontSize: 16,
   color: colors.white,
   fontWeight: 'bold',
  },
  divider:{
   height: 1.5,
   backgroundColor: colors.grey,
   marginVertical: 15,
  },
  heading:{
    textAlign: 'left',
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom:10,
  },
  productDetailsContainer:{
    backgroundColor: colors.productDetailContainer,
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: colors.black,
    marginBottom:20,
    marginTop: 5,
    lineHeight:20,
  },
  productDetailsText:{
    fontSize: 16,
    color: colors.black,
    marginBottom: 5,
  },
  modalContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:"center",
  },
  modalCloseText:{
    fontSize:16,
    color:colors.black,
    fontWeight:'bold',
  },
  modalCloseButton:{
    position:'absolute',
    top:40,
    right:20,
    backgroundColor:colors.grey,
    borderRadius:5,
    borderColor:colors.black,
    borderWidth:1
  },
  modalImage:{
    width: '90%',
    height: '70%',
  },
});
