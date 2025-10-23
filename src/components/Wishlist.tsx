import { View, Text, TouchableOpacity, StyleSheet,ViewStyle} from 'react-native'
import React,{useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';

//interface foe whislist
interface Whishlist{
   style?: ViewStyle,
}
/**
 * Wishlist component
 * @returns toggle Wishlist
 */
const Whislist: React.FC<Whishlist>= ({style}) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const toggleWishlist =() =>{
        setIsWishlisted(prev => !prev)
    }
  return (
     <TouchableOpacity
        style={style}
        onPress={toggleWishlist} >
      <Ionicons
         name={isWishlisted ? "heart" : "heart-outline"}
         size={24}
         color={isWishlisted ? colors.red : colors.black}
      />
     </TouchableOpacity>
   
  )
}

export default Whislist

