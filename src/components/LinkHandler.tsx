import { View, Text , TouchableOpacity, TextStyle, ViewStyle} from 'react-native'
import React from 'react'
import Fontisto from "react-native-vector-icons/Fontisto";

//Type for LinkHandler 
type LinkHandlerProps={
    onPress ?: ()=> void; // handle button press
    content?: string;
    textStyle?: TextStyle;
    iconName?: string;
    iconColor?: string;
    iconSize?: number;
    viewStyle?: ViewStyle| ViewStyle[];
    disabled?: boolean;
    iconComponent?:React.ReactNode;  //allows JSX(like <Ioicons/>) - it covers JSX elements, strings, numbers, arrays, and null.

}

/**
 * LinkHnadler Component -  contains CustomTouchableopacity for navigation to other screen/authentication conatins text or with auth icons
 * @returns LinkHandler component - touchbleopacity view
 */
const LinkHandler: React.FC<LinkHandlerProps> = ({onPress, content,  textStyle,iconColor = "#888",iconName, iconSize=20, viewStyle, disabled, iconComponent}) => {
  return (
   
      <TouchableOpacity onPress={onPress} style={[viewStyle]} disabled={disabled}>
         {content && <Text style={[textStyle]}>{content}</Text>}
         {iconComponent ? (
           iconComponent) : (  iconName && <Fontisto name={iconName} color={iconColor} size={iconSize} />)}
          
      </TouchableOpacity>
   
  )
}

export default LinkHandler
