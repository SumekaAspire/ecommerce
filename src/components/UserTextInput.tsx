import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../styles/globalStyles';
import { styles } from 'react-native-image-slider-banner/src/style';
import { colors } from '../styles/colors';
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { textData } from '../constants/text';

//type and interface for UserTextInputProps

// type AutoCapitalize = "none" | "words";
// type KeyboardType ="email-address" | "default"

interface UserTextInputProps{
    type?:  "email" | "password" | "confirmPassword" | "name";
    value: string;
    label:string; //placeholder for text input
    onChangeText: (newValue: string) => void;
    iconName?: string;
    size?: number;
    iconColor?: string;
    error?: string;
    maxLength?: number;
    textLabel: string;
  
}
const UserTextInput: React.FC<UserTextInputProps> = ({type,value, label, onChangeText, iconName,size=22,iconColor= colors.grey, error,maxLength,textLabel }) => {
  
  const isPassword = type === 'password';
  const isConfirmPassword = type === 'confirmPassword';
  const keyboardType = type === 'email' ? 'email-address' : 'default';

  

// Manage password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
     setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View>
      <Text style={globalStyles.label}>{textLabel}</Text>
      <View style={globalStyles.inputContainer}>
      <TextInput
        key={isPasswordVisible.toString()} // Force re-render when visibility changes
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        style={globalStyles.input}
        maxLength={maxLength} 
        autoCapitalize="none"
        keyboardType={keyboardType}
        // secureTextEntry={secureTextEntry}
        secureTextEntry={(isPassword || isConfirmPassword) && !isPasswordVisible}
         
      />
      {iconName && <Icon name={iconName} size={size} color={colors.grey} />}
       {isPassword && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={isPasswordVisible ? 'eye-sharp' : 'eye-off-sharp'}
              size={size}
              color={colors.grey}
            />
          </TouchableOpacity>
        )}
    </View>
     {error? <Text style={globalStyles.error}>{error}</Text>: null}
    </View>
  )
}

export default UserTextInput