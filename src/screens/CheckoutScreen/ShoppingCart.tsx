import { View, Text, StyleSheet, FlatList, Image, Alert } from 'react-native'
import React, { use } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { colors } from '../../styles/colors'
import Button from '../../components/Button'
import { textData } from '../../constants/text'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { cartSelector, removeProductFromCart, updateProductQuantity } from '../../store/slices/cartSlice'
import LinkHandler from '../../components/LinkHandler'
import {increaseBtn, decreaseBtn, calculateTotals,handleRemove} from '../../utils/services'

/**
 * ShoppingCart component - displays the user added to cart products
 * once clicked checkout button navigates to checkout screen
 * @returns Cart component
 */
const ShoppingCart = () => {
    const navigation: any = useNavigation();
    const dispatch = useDispatch();
    const cartProducts = useSelector(cartSelector);
    //navigates to Checkout screen
    const handleCheckOut =()=>{
       navigation.navigate("CheckOut");
    }
   
   const {subTotal, taxGST, totalAmount, totalQuantity, shipping} = calculateTotals(cartProducts)
  return (
     <View style={styles.container}>
                  {/* <Button text={textData.checkOut} onPress={handleCheckOut} buttonStyle={styles.checkoutButton} containerStyle={styles.buttonAlignment} /> */}
       {cartProducts.length === 0 ? <Text style={styles.emptyText}>{textData.emptyCart}</Text>:   
        <> 
          <Text style={styles.heading}>{textData.shoppingCart}</Text>
          <View style={styles.cartContainer}>
                  <FlatList
                      scrollEnabled={true}
                    //   showsVerticalScrollIndicator={true}
                      data={cartProducts}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                          <View style={styles.productContainerCart}>
                             <View style={styles.imageContainer}>
                                   <Image source={{uri: item.image}} style={styles.image} resizeMode='contain'/>
                                </View>  
                             <View style={styles.productDetails}>
                                 
                                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.productTitle}>{item.title}</Text>
                                <View style={styles.qtyRemoveContainer}>
                                   <Text style={styles.priceText}>Each: {item.price}</Text>
                                   <Text style={styles.priceText}>{`${textData.price}: ₹${(item.price * item.quantity).toFixed(2)}`}</Text>
                                </View>    
                                <View style={styles.qtyRemoveContainer}>
                                    {/* <Text style={styles.quantityText}><Text style={styles.quantityLabel}>{textData.quantity} - </Text>{item.quantity}</Text> */}
                                     <View style={styles.quantityContainer}>
                                        <LinkHandler onPress={() => decreaseBtn(dispatch,item.id, item.quantity)} content={textData.decrease} viewStyle={styles.buttonQuantity} textStyle={styles.quantityText}/>
                                        <Text style={styles.quantity}>{item.quantity}</Text>
                                        <LinkHandler onPress={() =>increaseBtn(dispatch,item.id, item.quantity)} content={textData.increase} viewStyle={styles.buttonQuantity} textStyle={styles.quantityText}/>
                                    </View>
                                    <LinkHandler content={textData.remove} onPress={() => handleRemove(dispatch,item.id)} textStyle={styles.remove}/>
                                </View>    
                            </View>
                          </View>
                      )} />

                    <Text style={styles.summary}>{textData.textSummary}</Text>
                    <View style={styles.divider}/>
                    {/* Summary -  total amount and products, quantity */}
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                              <Text style={styles.summaryLabel}>{textData.subTotal} </Text>
                              <Text style={styles.summaryValue}>₹{subTotal.toFixed(3)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                             <Text style={styles.summaryLabel}>{textData.shipping} </Text>
                             <Text style={styles.summaryValue}>₹{shipping.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                             <Text style={styles.summaryLabel}>{textData.taxGst}  </Text>
                             <Text style={styles.summaryValue}>₹{taxGST.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                             <Text style={[styles.summaryLabel, styles.totalValue]}>{textData.totalAmount} </Text>
                             <Text style={[styles.summaryValue, styles.totalValue]}>₹{totalAmount.toFixed(2)}</Text>
                        </View>   
                        <View style={styles.summaryRow}>
                             <Text style={[styles.summaryLabel, styles.totalValue]}>{textData.totalItems} </Text>
                             <Text style={[styles.summaryValue, styles.totalValue]}>{totalQuantity}</Text>
                        </View>                     
                    </View>
           </View>
          <Button text={textData.checkOut} onPress={handleCheckOut} buttonStyle={styles.checkoutButton} containerStyle={styles.buttonAlignment} />
       </> }  
    </View>  
  )}

export default ShoppingCart
const styles= StyleSheet.create({
    container:{
     flex:1,
     backgroundColor: colors.white     
    },
    heading:{
        textAlign:'center',
        fontSize:17,
        fontWeight:'700',
        margin:10,
    },
    cartContainer:{
        flex:1,
        margin:10,
        backgroundColor:colors.lightGrey,
        borderRadius:5

    },
    checkoutButton:{
        borderRadius:10,
        width:350,

    },
    buttonAlignment:{
        alignItems:'center',
        margin:10,
    },
    productContainerCart:{
      flexDirection:'row',
      borderRadius:5,
      backgroundColor:colors.white,
      margin:5,
      padding:5,
    },
   emptyText:{
     fontSize: 16,
     color:colors.ORANGE_COLOR,
     textAlign:'center', 
     margin:20,
     fontWeight:'bold',
  },
  remove:{
    color:colors.red,
    textDecorationLine: 'underline',
    fontSize:13
  },
  image:{
    width: 60,
    height:60,
    backgroundColor:colors.grey,
  },
  imageContainer:{ 
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',  //backgroundColor:colors.black
  },
  productDetails:{
    flex:1,
    marginVertical:5,
    marginHorizontal:5,
  },
  productTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.black,
    marginBottom: 4,
  },
  priceText: {
    fontSize: 13,
    color: colors.grey,
    marginBottom: 6,
  },
  qtyRemoveContainer:{
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center',
    
  },
  quantityText: {
    fontSize: 13,
    color: colors.black, 
  },
  quantity:{
    marginHorizontal:7,
    fontSize: 13,
    color: colors.black, 
    fontWeight:'bold'
  },
  quantityLabel:{
    fontWeight:'600'
  },
  divider:{
    height:1.5,
    backgroundColor:colors.black,
    marginVertical:10,
    marginHorizontal:10,
  },
    summaryContainer:{
    backgroundColor:colors.inActive, 
   // padding:20, // borderRadius:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  summary:{
    textAlign:'left',
    fontSize:14,
    marginHorizontal:10,
    color:colors.orange,
    fontWeight:'bold',
    marginTop:5

  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.black,    //fontWeight:'bold'
  },
  summaryValue: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '600',
  },
  totalValue: {
    marginTop: 6,
    fontWeight: 'bold',
  },
  quantityContainer:{
    flexDirection: 'row',
    alignItems: 'center', 
  },
  buttonQuantity:{
    backgroundColor: colors.lightGrey,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2 ,   
  },
})











// import { View, Text, StyleSheet, FlatList, Image, Alert } from 'react-native'
// import React from 'react'
// import { globalStyles } from '../../styles/globalStyles'
// import { colors } from '../../styles/colors'
// import Button from '../../components/Button'
// import { textData } from '../../constants/text'
// import { useNavigation } from '@react-navigation/native'
// import { useDispatch, useSelector } from 'react-redux'
// import { cartSelector, removeProductFromCart, updateProductQuantity } from '../../store/slices/cartSlice'
// import LinkHandler from '../../components/LinkHandler'
// import {increaseBtn} from '../CheckoutScreen/services'

// /**
//  * ShoppingCart component - displays the user added to cart products
//  * once clicked checkout button navigates to checkout screen
//  * @returns Cart component
//  */
// const ShoppingCart = () => {
//     const navigation: any = useNavigation();
//      const dispatch = useDispatch();
//     const cartProducts = useSelector(cartSelector);
//     //navigates to Checkout screen
//     const handleCheckOut =()=>{
//        navigation.navigate("CheckOut");
//     }
//     //handle removal of products from cart
//     const handleRemove = (id:number) => {
//       Alert.alert(
//         "Remove Product",
//         "Are you sure you want to remove this item/product from the cart?",
//         [
//           {
//             text:"Cancel",
//             onPress:() => console.log("Cancel Pressed."),
//             style :"cancel",
//           },
//           {
//             text:"Remove",
//             onPress :() =>{ dispatch(removeProductFromCart({ id }));},
//             style:"default",
//           },
//         ],
//         {cancelable: true}
//       )
   
//    }
//    //handle decrease and increase button
//   const increaseBtn=(id: number, currentQuantity: number)=>{
//     dispatch(updateProductQuantity({id, quantity: currentQuantity+1}))
//   }
//   const decreaseBtn=(id: number, currentQuantity: number)=>{
//     if(currentQuantity > 1){
//        dispatch(updateProductQuantity({id, quantity: currentQuantity-1}))
//     }else if(currentQuantity === 1){
//        dispatch(removeProductFromCart({id}))
//     }
//   }
//    const subTotal = cartProducts.reduce((acc, product) => acc+ product.price * product.quantity,0);
//    const taxGST = cartProducts.reduce((acc, product) => acc+ product.quantity + 0.21,0)
//    const shipping = subTotal > 0 ? 50 :0;
//    const totalAmount = subTotal + shipping+ taxGST;
//    const totalQuantity = cartProducts.reduce((acc, product) => acc + product.quantity, 0);
//   return (
//      <View style={styles.container}>
//                   <Button text={textData.checkOut} onPress={handleCheckOut} buttonStyle={styles.checkoutButton} containerStyle={styles.buttonAlignment} />

//        {cartProducts.length === 0 ? <Text style={styles.emptyText}>{textData.emptyCart}</Text>:   
//         <> 
//           <Text style={styles.heading}>{textData.shoppingCart}</Text>
//           <View style={styles.cartContainer}>
//                   <FlatList
//                       scrollEnabled={true}
//                     //   showsVerticalScrollIndicator={true}
//                       data={cartProducts}
//                       keyExtractor={(item) => item.id.toString()}
//                       renderItem={({ item }) => (
//                           <View style={styles.productContainerCart}>
//                              <View style={styles.imageContainer}>
//                                    <Image source={{uri: item.image}} style={styles.image} resizeMode='contain'/>
//                                 </View>  
//                              <View style={styles.productDetails}>
                                 
//                                 <Text numberOfLines={1} ellipsizeMode='tail' style={styles.productTitle}>{item.title}</Text>
//                                 <View style={styles.qtyRemoveContainer}>
//                                    <Text style={styles.priceText}>Each: {item.price}</Text>
//                                    <Text style={styles.priceText}>{`${textData.price}: ₹${(item.price * item.quantity).toFixed(2)}`}</Text>
//                                 </View>    
//                                 <View style={styles.qtyRemoveContainer}>
//                                     {/* <Text style={styles.quantityText}><Text style={styles.quantityLabel}>{textData.quantity} - </Text>{item.quantity}</Text> */}
//                                      <View style={styles.quantityContainer}>
//                                         <LinkHandler onPress={() => decreaseBtn(item.id, item.quantity)} content={textData.decrease} viewStyle={styles.buttonQuantity} textStyle={styles.quantityText}/>
//                                         <Text style={styles.quantity}>{item.quantity}</Text>
//                                         <LinkHandler onPress={() =>increaseBtn(item.id, item.quantity)} content={textData.increase} viewStyle={styles.buttonQuantity} textStyle={styles.quantityText}/>
//                                     </View>
//                                     <LinkHandler content={textData.remove} onPress={() => handleRemove(item.id)} textStyle={styles.remove}/>
//                                 </View>    
//                             </View>
//                           </View>
//                       )} />

//                     <Text style={styles.summary}>{textData.textSummary}</Text>
//                     <View style={styles.divider}/>
//                     {/* Summary -  total amount and products, quantity */}
//                     <View style={styles.summaryContainer}>
//                         <View style={styles.summaryRow}>
//                               <Text style={styles.summaryLabel}>{textData.subTotal} </Text>
//                               <Text style={styles.summaryValue}>₹{subTotal.toFixed(3)}</Text>
//                         </View>
//                         <View style={styles.summaryRow}>
//                              <Text style={styles.summaryLabel}>{textData.shipping} </Text>
//                              <Text style={styles.summaryValue}>₹{shipping.toFixed(2)}</Text>
//                         </View>
//                         <View style={styles.summaryRow}>
//                              <Text style={styles.summaryLabel}>{textData.taxGst}  </Text>
//                              <Text style={styles.summaryValue}>₹{taxGST.toFixed(2)}</Text>
//                         </View>
//                         <View style={styles.summaryRow}>
//                              <Text style={[styles.summaryLabel, styles.totalValue]}>{textData.totalAmount} </Text>
//                              <Text style={[styles.summaryValue, styles.totalValue]}>₹{totalAmount.toFixed(2)}</Text>
//                         </View>   
//                         <View style={styles.summaryRow}>
//                              <Text style={[styles.summaryLabel, styles.totalValue]}>{textData.totalItems} </Text>
//                              <Text style={[styles.summaryValue, styles.totalValue]}>{totalQuantity}</Text>
//                         </View>                     
//                     </View>
//            </View>
//           <Button text={textData.checkOut} onPress={handleCheckOut} buttonStyle={styles.checkoutButton} containerStyle={styles.buttonAlignment} />
//        </> }  
//     </View>  
//   )}

// export default ShoppingCart
// const styles= StyleSheet.create({
//     container:{
//      flex:1,
//      backgroundColor: colors.white     
//     },
//     heading:{
//         textAlign:'center',
//         fontSize:17,
//         fontWeight:'700',
//         margin:10,
//     },
//     cartContainer:{
//         flex:1,
//         margin:10,
//         backgroundColor:colors.lightGrey,
//         borderRadius:5

//     },
//     checkoutButton:{
//         borderRadius:10,
//         width:350,

//     },
//     buttonAlignment:{
//         alignItems:'center',
//         margin:10,
//     },
//     productContainerCart:{
//       flexDirection:'row',
//       borderRadius:5,
//       backgroundColor:colors.white,
//       margin:5,
//       padding:5,
//     },
//    emptyText:{
//      fontSize: 16,
//      color:colors.ORANGE_COLOR,
//      textAlign:'center', 
//      margin:20,
//      fontWeight:'bold',
//   },
//   remove:{
//     color:colors.red,
//     textDecorationLine: 'underline',
//     fontSize:13
//   },
//   image:{
//     width: 60,
//     height:60,
//     backgroundColor:colors.grey,
//   },
//   imageContainer:{ 
//     width: 70,
//     justifyContent: 'center',
//     alignItems: 'center',  //backgroundColor:colors.black
//   },
//   productDetails:{
//     flex:1,
//     marginVertical:5,
//     marginHorizontal:5,
//   },
//   productTitle: {
//     fontWeight: '600',
//     fontSize: 14,
//     color: colors.black,
//     marginBottom: 4,
//   },
//   priceText: {
//     fontSize: 13,
//     color: colors.grey,
//     marginBottom: 6,
//   },
//   qtyRemoveContainer:{
//     flexDirection:"row",
//     justifyContent:'space-between',
//     alignItems:'center',
    
//   },
//   quantityText: {
//     fontSize: 13,
//     color: colors.black, 
//   },
//   quantity:{
//     marginHorizontal:7,
//     fontSize: 13,
//     color: colors.black, 
//     fontWeight:'bold'
//   },
//   quantityLabel:{
//     fontWeight:'600'
//   },
//   divider:{
//     height:1.5,
//     backgroundColor:colors.black,
//     marginVertical:10,
//     marginHorizontal:10,
//   },
//     summaryContainer:{
//     backgroundColor:colors.inActive, 
//    // padding:20, // borderRadius:10,
//     borderTopLeftRadius:10,
//     borderTopRightRadius:10,
//     paddingHorizontal: 10,
//     paddingVertical: 15,
//   },
//   summary:{
//     textAlign:'left',
//     fontSize:14,
//     marginHorizontal:10,
//     color:colors.orange,
//     fontWeight:'bold',
//     marginTop:5

//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 4,
//   },
//   summaryLabel: {
//     fontSize: 14,
//     color: colors.black,    //fontWeight:'bold'
//   },
//   summaryValue: {
//     fontSize: 14,
//     color: colors.black,
//     fontWeight: '600',
//   },
//   totalValue: {
//     marginTop: 6,
//     fontWeight: 'bold',
//   },
//   quantityContainer:{
//     flexDirection: 'row',
//     alignItems: 'center', 
//   },
//   buttonQuantity:{
//     backgroundColor: colors.lightGrey,
//     borderRadius: 5,
//     paddingHorizontal: 8,
//     paddingVertical: 2 ,   
//   },
// })











