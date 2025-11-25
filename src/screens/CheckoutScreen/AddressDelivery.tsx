import { View, Text, StyleSheet, ScrollView,} from 'react-native'
import React, { useEffect, useState } from 'react'
import UserTextInput from '../../components/UserTextInput'
import { textData } from '../../constants/text'
import { globalStyles } from '../../styles/globalStyles'
import { colors } from '../../styles/colors'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from '../../store/slices/userSlice'
import LinkHandler from '../../components/LinkHandler'
import { validateFirstName,validateLastName,validateAddress,validateCity,validatePhone,validatePincode,validateState, validateCountry } from '../../constants/Validations'
/**
 * AddressDelivery Component - collects data from user, can edit and save it here
 * When page opens: Inputs filled with saved values from Redux,No error messages shown, Only Edit button visible,
 * When user clicks Edit:Fields become editable,Button changes to SAVE
 * onValidationChange - callback to inform the parent whether the form is valid.
 * @returns delivery information UI
 */
const AddressDelivery = ({ onValidationChange }: { onValidationChange?: (isValid: boolean) => void }) => {
   const dispatch = useDispatch();
   const userAddress = useSelector(selectUser);

  //local state for form fields
   const[firstName, setFirstName]= useState(userAddress?.firstName ||'');
   const[lastName, setLastName] = useState(userAddress?.lastName||'');
   const[country, setCountry] =useState(userAddress?.country||'India');
   const[pincode, setPincode] = useState(userAddress?.pincode||'');
   const[city, setCity] = useState(userAddress?.city||'');
   const[state, setState] = useState(userAddress?.state||'');
   const[address, setAddress] = useState(userAddress?.address||'');
   const[houseFlat, setHouseFlat] = useState(userAddress?.houseFlat||'');
   const[phone, setPhone] = useState(userAddress?.phone||'');

   //For user to click the edit button  to edit the data
   const [isEditing, setIsEditing] = useState(false);
  // Error States
   const [errors, setErrors] = useState({firstName: "",lastName: "",address: "", city: "", state: "", pincode: "", phone: "",country:"",});
  //Validate All Fields at once
  const validateAll = () => {
    const newErrors = {
      firstName: validateFirstName(firstName),
      lastName: validateLastName(lastName),
      address: validateAddress(address),
      city: validateCity(city),
      state: validateState(state),
      pincode: validatePincode(pincode),
      phone: validatePhone(phone),
      country: validateCountry(country),
    };
    setErrors(newErrors);

    // check if any error message exists- Returns true only when all error messages are empty.
    return Object.values(newErrors).every((msg) => msg === "");
  };

   //Handle Save:  Validate all fields, If any error ->stop, show inline errors, If valid -> save to Redux store, Turn off Edit mode and Notify parent that validation passed, diable editing
   const handleSave=()=>{
     const isValid = validateAll();
     if (!isValid) {
        onValidationChange?.(false);
        return;
     }
     const updateDetails = {firstName,lastName,country,pincode,city,state,address,houseFlat,phone};
     dispatch(setUser(updateDetails));
     setIsEditing(false);
     onValidationChange?.(true);
   }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Delivery Information</Text>
      <ScrollView>
         {/* FirstName and LastName*/}
       <View style={styles.rowContainer}>
         <UserTextInput 
           value={firstName}
           type="name"
           label={textData.firstName}
           onChangeText={setFirstName}
           containerStyle={styles.inputContainer}  
           editable={isEditing}   
           error={errors.firstName}
         />
         <UserTextInput 
           value={lastName}
           type="name"
           label={textData.lastName}
           onChangeText={setLastName}
           containerStyle={styles.inputContainer} 
           editable={isEditing}   
           error={errors.lastName}   
         />
       </View>
       {/* Address */}
       <UserTextInput 
           value={address}
           type="address"
           label={textData.address}
           onChangeText={setAddress}
           numberOfLines={4}
           containerStyle={{...styles.inputContainer, height:80, width:345}}  
           editable={isEditing}    
           error={errors.address} 
        />
         {/* House/flat/buildingNo and PhoneNo*/}
        <View style={styles.rowContainer}>
          <UserTextInput 
           value={houseFlat}
           type="houseFlat"
           label={textData.houseFlat}
           onChangeText={setHouseFlat}
           containerStyle={styles.inputContainer}   
           editable={isEditing}   
         
         /> 
          <UserTextInput 
           value={city}
           type="city"
           label={textData.city}
           onChangeText={setCity}
           containerStyle={styles.inputContainer}  
           editable={isEditing}     
           error={errors.city} 
         />
        
       </View>    
        {/* City and State*/}
       <View style={styles.rowContainer} >
        
         <UserTextInput 
           value={state}
           type="state"
           label={textData.state}
           onChangeText={setState}
           containerStyle={styles.inputContainer}
           editable={isEditing}    
           error={errors.state} 
         />
         <UserTextInput 
           value={phone}
           type="phone"
           label={textData.phoneNo}
           onChangeText={setPhone}
           containerStyle={styles.inputContainer} 
           maxLength={10}
           editable={isEditing}  
           error={errors.phone}    
         />
       </View>
      
        {/* Country and PinCode*/}
       <View style={styles.rowContainer}>
         <UserTextInput 
           value={country}
           type="country"
           label={textData.country}
           onChangeText={setCountry}
           containerStyle={styles.inputContainer}
           editable={isEditing} 
           error={errors.country}      
         />
         <UserTextInput 
           value={pincode}
           type="pincode"
           label={textData.pinCode}
           onChangeText={setPincode}
           containerStyle={styles.inputContainer }
           maxLength={6}
           editable={isEditing}   
           error={errors.pincode}
         />
       </View>

      </ScrollView>

      <View style={styles.buttonContainer}>
        {isEditing ?(<LinkHandler content={textData.save} onPress={handleSave} textStyle={globalStyles.buttonText} viewStyle={styles.button}/>
        ):( <LinkHandler content={textData.edit} onPress={() =>setIsEditing(true)} textStyle={globalStyles.buttonText} viewStyle={styles.button} />)}
      </View>
       
    </View>
  )
}

export default AddressDelivery

 const styles= StyleSheet.create({
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
   rowContainer:{
     flexDirection:'row',
     justifyContent:'space-between',
     
   },
   inputContainer:{
    flex:1,
    justifyContent:"flex-start",
    alignItems:'flex-start',
    borderWidth: 1,
    borderColor: "#696464ff",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 0,
    width:165,

   },
   button: {
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 5,
    marginVertical:20,
    marginHorizontal:5,
  },
   buttonContainer: {
    // flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 10,   
  },
 })


