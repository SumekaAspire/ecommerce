import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../styles/colors'
import { paymentOptions } from '../../mockdata/mockData'
import { FlatList } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinkHandler from '../../components/LinkHandler'

interface PaymentProps{
 onPaymentSelect : (mathod: string)=>void; // callback to parent
}
/**
 * Payment component - user can selects payment options
 * @returns Payment method ui
 */
const Payment = ({onPaymentSelect}: PaymentProps) => {

  const [selectedId, setSelectedId] = useState<string | null>(null);
  //handle user selected options
  const handleSelect =(id: string, name: string) =>{
    setSelectedId(id);
    onPaymentSelect(name);
  }

//handles rendering the ui for flatlist
  const renderItem = ({ item }: any) => {
    const isSelected = selectedId === item.id;
    return(
     
         <View style={styles.cardContainerView}>
           <View style={styles.leftContent}>
             <Ionicons name={item.icon}size={22} color={colors.grey}/>
              <Text style={styles.textAlignment}>{item.name}</Text>
           </View>
           <TouchableOpacity
             onPress={() => handleSelect(item.id, item.name)} >
             <Ionicons 
               name={isSelected ? 'radio-button-on' : 'radio-button-off'} 
               size={24} 
               color={isSelected ? colors.orange : colors.grey}
             />
            </TouchableOpacity>
            
         </View>
     
  );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Payment Methods/Options</Text>
    
      <FlatList
        data={paymentOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
       />
      
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({
  container:{
     padding: 10,
     backgroundColor: colors.lightGrey,
     borderRadius: 10,
  },
  heading:{
     textAlign:'left',
     marginVertical:10,
     marginHorizontal:5,
     fontSize:16,
     fontWeight:'bold'
  },
  cardContainerView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:colors.white,
    borderRadius:10,
    elevation:1.5,
    padding:10,
    marginBottom:10,
    marginVertical:10
  },
  textAlignment:{
    fontSize:16,
    marginLeft:15,
    marginVertical:10
  },

   leftContent: {
    flexDirection: 'row',
    alignItems:'center',
   },
  
})
