import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import LinkHandler from '../../components/LinkHandler'
import { useNavigation } from '@react-navigation/native'
import { textData } from '../../constants/text'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/slices/userSlice'

/**
 * Orderconfirmation component - displays order confirmation message with user details
 * @returns OrderConfirmation component
 */
const OrderConfirmation = ({paymentMethod}: any) => {
  const navigation: any = useNavigation();
  const userData = useSelector(selectUser);

  //handle navigation to homeScreen- for continue shopping
  const handleContinueShopping =()=>{
     navigation.navigate("FeedBack");
  }
  const userOrder = {
    name: userData?.name || "Rahul Sharma",
    address: userData?.address || "221B Baker Street, Mumbai, MH",
    phone: userData?.phone || "9876543210",
    deliveryMsg: "Your order will arrive in 3–5 working days.",
    paymentMethod: paymentMethod ,
    itemsTotal: 3800,
    grandTotal: 3920,
  };
  return ( 
    <View style={styles.container}> 
        <View style={styles.cardContainerView}>
          <View style={styles.orderConfirmedAlignment}>
           <Ionicons name={textData.giftIcon}size={24} color={colors.red}/>
           <Text style={styles.heading}>{textData.orderconfirmed}</Text>
          </View>

          <Text style={styles.label}>{textData.persoName}</Text>
          <Text style={styles.data}>{userOrder.name}</Text>

          <Text style={styles.label}>{textData.deliveryAddress}</Text>
          <Text style={styles.data}>{userOrder.address}</Text>

          <Text style={styles.label}>{textData.phoneNumber}</Text>
          <Text style={styles.data}>{userOrder.phone}</Text>

          <Text style={styles.label}>{textData.deliveredIn}</Text>
          <Text style={styles.data}>{userOrder.deliveryMsg}</Text>

          <Text style={styles.label}>{textData.paymentMethod}</Text>
          <Text style={styles.data}>{userOrder.paymentMethod}</Text>

          {/* <Text style={styles.label}>{textData.totalItemsOrdered}</Text>
          <Text style={styles.data}>{userOrder.itemsTotal}</Text>

          <Text style={styles.label}>{textData.amountTotalPaid} </Text>
          <Text style={styles.data}>{userOrder.grandTotal}</Text> */}
          <LinkHandler viewStyle={styles.button} onPress={handleContinueShopping} content={textData.continueShopping} textStyle={styles.buttonText}/>      
        </View>
          <Text style={styles.thanksMsg}>{textData.thanksMsg}</Text>

    </View>
      
   
  )
}

export default OrderConfirmation

const styles = StyleSheet.create({
  container:{
     flex:1,
     padding: 15,
     backgroundColor: colors.lightGrey,
     borderRadius: 10,
     justifyContent:'center'
  },
  heading:{
     textAlign:'center',
     marginVertical:10,
     marginHorizontal:5,
     fontSize:20,
    //  fontWeight:'bold',
     fontFamily:"AlanSans-Regular",

  },
  cardContainerView:{
    borderRadius:5,
    borderColor:colors.white,
    backgroundColor:colors.white,
    elevation:1.5,
    margin:10,
    padding:20,
  },
  label:{
     fontSize: 14,
     fontWeight:'bold',
     marginTop:10,
  },
  data:{
    fontSize:14,
    color:colors.grey,
  },
  button:{
    marginTop: 25,
    backgroundColor: colors.PRIMARY_COLOR,
    padding: 14,
    borderRadius: 8,
    alignItems:'center'
  },
  buttonText:{
    color: colors.white,
    fontSize: 16,
    fontWeight:'bold'
  },
  thanksMsg:{
     fontSize: 14,
     marginTop:10,
     fontFamily:"AlanSans-Regular",
     textAlign:'center', 
  },
  orderConfirmedAlignment:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  }

})
