import { colors } from "./colors";
import { StyleSheet } from "react-native";

export const globalStyles= StyleSheet.create({
  
    text: {
        color: colors.black,
        fontSize: 14,
        fontFamily:'Figtree-Regular',

    },
    /** Common button for intro,auth screens */
    button:{
          width:330,
          height:47,
          backgroundColor:colors.ORANGE_COLOR,
          borderRadius: 10,
          justifyContent:'center',
          // marginTop:90

      },
    /*SignUp and Login Screen */
    continueBtnText:{
      textAlign:'center',
      color:colors.white,
      fontFamily:"AlanSans-Regular",
      fontSize: 18,
      alignItems:'center'
    
    },
    
    container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.PRIMARY_BACKGROUNDCOLOR,
  },

    
  heading: {
    fontSize: 30,
    fontFamily: "AlanSans-Medium",
    marginTop:15
  },
  subHeading: {
    fontSize: 14,
    marginBottom: 25,
    fontFamily:"AlanSans-Regular",
    color:colors.formColor,
    left:5,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.formColor,
    left: 29,
    marginBottom: 3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 17,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    fontSize: 13,
    fontFamily: "FigTree-Regular",
  },
  error: {
    color: "red",
    fontSize: 12,
    textAlign: "right",
    right: 12,
  },
  smallText:{
      textAlign:'center',
      fontSize: 14,
      fontFamily:"FigTree-Regular",
      color: colors.formColor,
      marginBottom:10,

    },
    socialContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 20,
  },
  termCondition: {
    textAlign: "center",
    padding: 35,
    fontSize: 13,
    fontFamily: "AlanSans-Regular",
    color: colors.formColor,
  },
  globalError:{
    color: "red",
    fontSize: 12,
    textAlign: "center",
    right: 12,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },

})


//for productlist, whishlist componet
export const productCardView = StyleSheet.create({
  productCard: {
    flex:1,
    justifyContent:"flex-start",
    alignItems:"center",
    backgroundColor: "#f6f3f3ff",
    borderRadius: 5,
    marginHorizontal: 5,
    padding: 5,
    marginTop:5,
    minHeight: 320, //ensures each card has the same height
   
  },
  image: {
    width: 160,
    height: 150,
    // borderRadius: 10,
    // borderColor:colors.grey,
    // borderWidth:2,
    alignItems:"center",
    margin:5,
    marginTop:10,
    
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    textAlign:"center"
  },
  productPrice:{
    color: colors.ORANGE_COLOR,
    fontSize: 15,
    marginTop: 3,
    textAlign:"center"
  },
  itemSeparator:{
    height:5,
    backgroundColor:'transparent',
    //backgroundColor:'#888',
  },
   wishlistIcon:{
    top: 5,
    left:70,
   
 },
   cartButton:{
    backgroundColor: colors.ORANGE_COLOR,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cartBtnText:{
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
})