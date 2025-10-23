import { View, Text , TouchableOpacity, TextStyle} from 'react-native'
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

}

/**
 * LinkHnadler Component -  contains CustomTouchableopacity for navigation to other screen/authentication conatins text or with auth icons
 * @returns LinkHandler component - touchbleopacity view
 */
const LinkHandler: React.FC<LinkHandlerProps> = ({onPress, content,  textStyle,iconColor = "#888",iconName, iconSize=20}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
           {iconName && (
            <Fontisto name={iconName} color={iconColor} size={iconSize}/>
           )}
           {content && <Text style={[textStyle]}>{content}</Text>}
      </TouchableOpacity>
    </View>
  )
}

export default LinkHandler
