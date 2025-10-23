import React, { useState } from "react";
import {View,Text,StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { textData, toast } from "../../constants/text";
import { colors } from "../../styles/colors";
import { globalStyles } from "../../styles/globalStyles";
import TermsAndConditionsModal from "../../components/TermsAndConditionsModal";
import Button from "../../components/Button";
import LinkHandler from "../../components/LinkHandler";
import { showToast } from "../../utils/Toast";
import { validateEmail, validatePassword, validateName, validateConfirmPassword } from "../../constants/Validations";
import UserTextInput from "../../components/UserTextInput";

export default function SignUp() {

  const navigation: any = useNavigation();
  //Manges state for signup screen
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error state
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  //Managing state for the terms are accepted
  const [termsAccepted, setTermsAccepted] = useState(false);

  //handle navigation to Login screen
  const handleNavigateToLogin =() =>{
     navigation.navigate("Login");
  }

 /**
   * Handles SignUp button which navigates to login screen along wth validations.
   * validates data submitted by the user.
   */
  const handleSignUp = () => {
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmPassErr = validateConfirmPassword(password, confirmPassword);

    setNameError(nameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmPassErr);

    if (nameErr || emailErr || passwordErr || confirmPassErr) return;
    if (!termsAccepted) {
           showToast({type: toast.typeError, text1: toast.termConditionToastText, text2: toast.acceptTermsConditionsToast,position : "bottom", });
          return;
    }      
    // Show success toast and navigate to Login screen
    showToast({ type: toast.signupTypeSuccess, text1: toast.signUpSuccess,text2: toast.signUpSuccessText + `${name}!`, position : "bottom", });
    navigation.navigate('Login');
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>{textData.signupText}</Text>
      <Text style={globalStyles.subHeading}>{textData.subText}</Text>

        {/* Name Field */}
      {/* <View style={globalStyles.inputContainer}>
       
        <TextInput
          style={globalStyles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor={colors.grey}
        />
         <Icon name="person" size={22} color={colors.grey}  />
      </View>
      {nameError ? <Text style={globalStyles.error}>{nameError}</Text> : null} */}
        {/* Name*/}
        <UserTextInput 
          value={name}
          type="name"
          label={textData.fullNamePlaceholder}
          onChangeText={setName}
          iconName="person"
          textLabel={textData.name}
          error={nameError}
        />
        {/* email */}
       <UserTextInput 
        value={email}
        type="email"
        label={textData.emailPlaceholder}
        onChangeText={setEmail}
        iconName="email"
        error={emailError} 
        textLabel={textData.email}/>

         {/* password */}
       <UserTextInput 
          value={password}
          type="password"
          label={textData.passwordPlaceholder} 
          onChangeText={setPassword} 
          maxLength={16}
          textLabel={textData.password}
          error={passwordError}/>

          {/* confirm password */}
       <UserTextInput 
          value={confirmPassword}
          type="confirmPassword"
          label={textData.confirmPassword} 
          onChangeText={setConfirmPassword}
          maxLength={16}
          textLabel={textData.confirmPassword}
          iconName="lock"
          error={confirmPasswordError}
          />
      {/* SignUp Button - reusable component, navigates to next screen*/}
      <Button text={textData.continue} onPress={handleSignUp} containerStyle={{marginTop:20, marginLeft:11, marginBottom:10}}/>

      {/* Move to Login screen through already have an account text */}
      <LinkHandler onPress={handleNavigateToLogin} content={textData.login} textStyle={styles.moveToLogin}/>


     {/* or text and social media login option icons */}
     <Text style={globalStyles.smallText}>{textData.or}</Text>

     {/* auth icons - reusable componnets , give touchable opacity view*/}
      <View style={globalStyles.socialContainer}>
        <LinkHandler iconName="google" iconColor={colors.google} iconSize={28} />
        <LinkHandler iconName="facebook" iconColor={colors.faceBook} iconSize={28} />
        <LinkHandler iconName="twitter" iconColor={colors.twitter} iconSize={28}/>
      </View>
      
      
      {/* Notify parent Component via onAccept callBack
         onAccept function - to update termsAccepted state to true when the user accepts the terms and conditions by checking the checkbox in the modal. 
         setTermsAccepted(true) - triggers once user clicked the checkBox, set the state as true 
       */}
    <TermsAndConditionsModal onAccept={() => setTermsAccepted(true)} />
    
    </View>
  );
}

const styles = StyleSheet.create({
  
    moveToLogin:{
      textAlign:'center',
      fontSize:13,
      fontFamily:"AlanSans-Regular",
      color: '#1c1b1bff',
      marginBottom:30

    }
});

