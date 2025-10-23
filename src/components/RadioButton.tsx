import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { RadioButton as PaperRadioButton } from 'react-native-paper';

const RadioButton = () => {
    const [isSelected, setIsSelected]= useState('');
  
  return (
    <View style={styles.container}>
        <View style={styles.radioContainer}>
        <PaperRadioButton
         value="Male"
         status={isSelected === 'Male' ? 'checked' : 'unchecked'}
         onPress={() => setIsSelected('Male')}
         color='#335934ff'
         uncheckedColor='#000'
        />
        <Text style={styles.textAlignment}>Male</Text>
        </View>
         <View style={styles.radioContainer}>
        <PaperRadioButton
         value="Female"
         status={isSelected === 'Female'? 'checked': 'unchecked'}
         onPress={() => setIsSelected('Female')}
         color='#335934ff'
         uncheckedColor='#000'/> 
        <Text style={styles.textAlignment}>Female</Text>
        </View>
    </View>
  )
}

export default RadioButton;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        // justifyContent:'center',
        alignItems:'center',
    },
    radioContainer:{
        flexDirection:'row',
    },
    textAlignment:{
        textAlign:'center',
        paddingTop: 7,
        paddingBottom: 5,
        paddingLeft: 1,
        paddingRight: 7,

    }
})