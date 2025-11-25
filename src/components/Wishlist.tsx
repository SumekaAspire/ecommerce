import { View, Text, TouchableOpacity, StyleSheet,ViewStyle} from 'react-native'
import React,{useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist, wishlistSelector } from '../store/slices/wishlistSlice';

//interface foe whislist
interface Wishlist{
   style?: ViewStyle,
   //productId:string,
   product:{
    id: number;
    title: string;
    image?: string;
    price?: number;
   }
}
/**
 * Wishlist component
 * @returns whishlist icon- can be toggle (added or removed to Wishlist)
 */
const Wishlist: React.FC<Wishlist>= ({style,product}) => {
   const dispatch = useDispatch();
   const wishlistItems = useSelector(wishlistSelector);
   const isWishlisted = wishlistItems.some(item => item.id === product.id)

    //handle toggleWishlist
    const handleToggle =() =>{
       dispatch(toggleWishlist(product));
    }
  return (
     <TouchableOpacity
        style={style}
        onPress={handleToggle} >
      <Ionicons
         name={isWishlisted ? "heart" : "heart-outline"}
         size={24}
         color={isWishlisted ? colors.red : colors.black}
      />
     </TouchableOpacity>
   
  )
}

export default Wishlist










// import { View, Text, TouchableOpacity, StyleSheet,ViewStyle} from 'react-native'
// import React,{useState} from 'react'
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { colors } from '../styles/colors';

// //interface foe whislist
// interface Whishlist{
//    style?: ViewStyle,
// }
// /**
//  * Wishlist component
//  * @returns toggle Wishlist
//  */
// const Whislist: React.FC<Whishlist>= ({style}) => {
//     const [isWishlisted, setIsWishlisted] = useState(false);

//     const toggleWishlist =() =>{
//         setIsWishlisted(prev => !prev)
//     }
//   return (
//      <TouchableOpacity
//         style={style}
//         onPress={toggleWishlist} >
//       <Ionicons
//          name={isWishlisted ? "heart" : "heart-outline"}
//          size={24}
//          color={isWishlisted ? colors.red : colors.black}
//       />
//      </TouchableOpacity>
   
//   )
// }

// export default Whislist

