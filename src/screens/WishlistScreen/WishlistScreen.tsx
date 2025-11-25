import { View, Text, StyleSheet, FlatList ,TouchableOpacity, Image} from 'react-native'
import React from 'react'
import Wishlist from '../../components/Wishlist'
import { colors } from '../../styles/colors'
import { globalStyles, productCardView } from '../../styles/globalStyles'
import { useDispatch, useSelector } from 'react-redux'
import { wishlistSelector } from '../../store/slices/wishlistSlice'
import { addToCart } from '../../store/slices/cartSlice'
import { textData } from '../../constants/text'
import LinkHandler from '../../components/LinkHandler'
import { useNavigation } from '@react-navigation/native'

/**
 * Wishlist screen - wishlisted products are displayed
 * can be removed the products from the wishlist using togglewishlist(from wishlist reusable component)
 * @returns Wishlist screen in the menu 
 */
const WishlistScreen = () => {

  const wishlistItems = useSelector(wishlistSelector);
  const dispatch= useDispatch();
  const navigation: any = useNavigation();
  
  //Handle add to cart from whishlist
  const handleAddToCart = (product: any) => {
   //dispatch action to add product to cart
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    }))
    navigation.navigate('ShoppingCart');
  }

  return (
    <View style={globalStyles.container}>
        {wishlistItems.length === 0 ?  <Text style={styles.emptyText}>{textData.wishlistEmptyText}</Text> :   
          <>
           <Text style={styles.heading}>{textData.wishlistHeading}</Text>
            <FlatList
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={wishlistItems}
              keyExtractor={(item) => item.id.toString()} 
              //converts it into a string (because React keys must be strings)
              renderItem={({ item }) => (
                  <TouchableOpacity
                      style={productCardView.productCard}
                  >
                      <Wishlist style={productCardView.wishlistIcon} product={item} />
                      <Image source={{ uri: item.image }} style={productCardView.image} />
                      <Text style={productCardView.productName}>{item.title}</Text>
                      <Text style={productCardView.productPrice}>₹{item.price}</Text>
                        {/* Add to cart */}
                      <LinkHandler onPress={() => handleAddToCart(item)} content={textData.addToCart} viewStyle={styles.cartButton} textStyle={styles.cartBtnText}/>

                  </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={productCardView.itemSeparator} />} />
             
            </>
            }
        
    </View>
  )
}

export default WishlistScreen

const styles = StyleSheet.create({
  heading:{
    textAlign:'center',
    fontSize:17,
    fontWeight:'700',
    margin:10,
 },  
  emptyText:{
    fontSize: 16,
    color:colors.ORANGE_COLOR,
    textAlign:'center', 
    margin:20,
    fontWeight:'bold',
 },
 cartButton:{
    backgroundColor: colors.ORANGE_COLOR,
    paddingVertical: 8,
    borderRadius: 10,
    paddingHorizontal:30,
    marginTop:7
 },
cartBtnText:{
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
//   productCard: {
//     flex:1,
//     justifyContent:"flex-start",
//     alignItems:"center",
//     backgroundColor: "#f6f3f3ff",
//     borderRadius: 5,
//     marginHorizontal: 5,
//     padding: 5,
//     marginTop:5,
//     minHeight: 320, //ensures each card has the same height
   
//   },
//   image: {
//     width: 160,
//     height: 150,
//     // borderRadius: 10,
//     // borderColor:colors.grey,
//     // borderWidth:2,
//     alignItems:"center",
//     margin:5,
//     marginTop:10,
    
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginTop: 5,
//     textAlign:"center"
//   },
//   productPrice:{
//     color: colors.ORANGE_COLOR,
//     fontSize: 15,
//     marginTop: 3,
//     textAlign:"center"
//   },
//   itemSeparator:{
//     height:5,
//     backgroundColor:'transparent'
//   },
//    wishlistIcon:{
//     top: 5,
//     left:70,
   
//  },

})


