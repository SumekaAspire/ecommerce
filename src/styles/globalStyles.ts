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
    padding: 20,
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
  }

})