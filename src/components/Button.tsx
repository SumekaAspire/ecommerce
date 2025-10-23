import { View, Text, TouchableOpacity, StyleSheet,ViewStyle} from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { colors } from '../styles/colors'

//type for Button props
type ButtonProps = {
 text: string;
 onPress :() => void; //function to call button is pressed
 containerStyle?: ViewStyle // add optional containerStyle prop for outer container to parent
 disabled?:boolean; 
 buttonStyle?: ViewStyle;
}

/**
 * Reusable Button Component
 * @returns Button component
 */
const Button: React.FC<ButtonProps> = ({text, onPress, containerStyle, disabled,buttonStyle}) => {
  return (
    
       <View style={[containerStyle]}>
      
        <TouchableOpacity style={[globalStyles.button,buttonStyle]} onPress={onPress} disabled={disabled}>
          <Text style={globalStyles.continueBtnText}>{text}</Text>
        </TouchableOpacity>
                
       </View>
    
  )
}

export default Button

// const styles = StyleSheet.create({
//   button:{
//           width:330,
//           height:47,
//           backgroundColor:colors.ORANGE_COLOR,
//           borderRadius: 10,
//           justifyContent:'center',
//           // marginTop:90

//       },
// })