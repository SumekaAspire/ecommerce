import { View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getGreeting } from "../../utils/common"
import { textData, error, toast } from "../../constants/text";
import { colors } from "../../styles/colors";
import { globalStyles } from "../../styles/globalStyles";
import Button from "../../components/Button";
import LinkHandler from "../../components/LinkHandler";
import { showToast } from "../../utils/Toast";
import CheckboxContent from "../../components/CheckBox";
import { validateEmail,validatePassword} from "../../constants/Validations";
import UserTextInput from "../../components/UserTextInput";
import { useDispatch } from "react-redux";
import { storeData } from "../../utils/asyncStorage";
import { setUser } from "../../store/slice/userSice";
import { userInfo } from "../../mockdata/mockData";
import { AppDispatch } from "../../store/store";



const Login = () => {
  
  const navigation :any = useNavigation();
  const dispatch = useDispatch<AppDispatch>();


  //manages state for login screen
  const [rememberMe, setRememberMe] = useState(false);
  const [greetings, setGreetings] = useState(getGreeting());

  const [email, setEmail] =useState("");
  const [password, setPassword] = useState("");

  // Password visibility
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  useEffect(()=>{
    /**Updates greeting message 
     * runs every 1 minute : 1minute = 60 seconds, 1 sec = 1000 millisecnds(60*1000)
     * automatically clears when component unmountes, prevents memmory leaks
     */
    const interval = setInterval(()=>{
      setGreetings(getGreeting());
    }, 60*1000);
    return ()=> clearInterval(interval);
  },[])
     
  const handleNaivigateToSignUp =() =>{
    navigation.navigate('SignUp');
  }

  /**
   * handles Login Button navigation with validtions
   * @returns Login button to navigate to next screen
   */
  const handleLogin = async() => {
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr || "");
    setPasswordError(passwordErr || "");

    if (emailErr || passwordErr) return;

    
    // Check login credentials from mock data
    const validUser = userInfo.find((user) =>user.email === email && user.password === password);
    if(validUser){
      //saved to asyncStorage and redux
      await storeData('user',validUser);
      dispatch(setUser(validUser));
      showToast({type: toast.typeSuccess, text1: toast.loginSuccess,text2: toast.loginSucessText, position: "bottom",});
      navigation.replace("HomeTab");
      setEmail("");
      setPassword("");
    } else {
      showToast({ type: toast.typeError, text1: toast.loginFailed, text2: toast.loginFailedText,position: "bottom", });
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>{greetings}</Text>
      <Text style={globalStyles.subHeading}>{textData.welcomeGreetiing}</Text>

       {/* email */}
       <UserTextInput 
          value={email}
          type="email"
          label={textData.emailPlaceholder} 
          onChangeText={setEmail} 
          iconName="email" 
          textLabel={textData.email}
          error={emailError}/>

         {/* password */}
       <UserTextInput 
          value={password}
          type="password"
          label={textData.passwordPlaceholder} 
          onChangeText={setPassword} 
          textLabel={textData.password}
          maxLength={16}
          error={passwordError}/>

      
        <View style={styles.rememberResetContainer}>
           {/* remember me  - used reusable checkbox component */}
          <CheckboxContent value={rememberMe} onValueChange={setRememberMe} tintColors={{true: colors.ORANGE_COLOR, false: colors.ORANGE_COLOR}} textContent={textData.rememberMe}/>

           {/* reset Password - used resuable component for TouchableOpacity  */}
          <LinkHandler content={textData.resetPassword} textStyle={styles.resetPassword}/>
        
        </View>

        {/* Login Button - reusable component, navigates to next screen*/}
        <Button text={textData.loginText} onPress={handleLogin} containerStyle={{marginTop:20, marginLeft:12, marginBottom:10}}/>
       
         {/* Move to signUp screen through register text  - reusable component*/}
        <LinkHandler onPress={handleNaivigateToSignUp} content={textData.register} textStyle={styles.textLogin}/>

        {/* OR Login with text and  icon to login */}
        <Text style={globalStyles.smallText}>{textData.orLoginWith}</Text>
       {/* auth icons - link to other- reusable componnets*/}
      <View style={globalStyles.socialContainer}>
        <LinkHandler iconName="google" iconColor={colors.google} iconSize={28} />
        <LinkHandler iconName="facebook" iconColor={colors.faceBook} iconSize={28} />
        <LinkHandler iconName="twitter" iconColor={colors.twitter} iconSize={28}/>
      </View>
      
        {/* Terms and condition- rendered tochableopacity view and here passed parameters */}
        <LinkHandler content={textData.termsAndConditions} textStyle={globalStyles.termCondition}/>
   
      </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  rememberResetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 12,
  },
  resetPassword: {
    fontSize: 13,
    color: "#ea8642ff",
    fontFamily: "AlanSans-Medium",
  },
  textLogin: {
    color: "#1c1b1bff",
    fontFamily: "AlanSans-SemiBold",
    left:20,
    marginBottom: 50,
  },
  textRegister:{
    color: colors.ORANGE_COLOR,
  }
})

