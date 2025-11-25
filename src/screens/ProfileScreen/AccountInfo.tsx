import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUser } from '../../store/slices/userSlice';
import LinkHandler from '../../components/LinkHandler';
import { colors } from '../../styles/colors';
import { textData } from '../../constants/text';
import { validateAddressProfileScreen } from '../../constants/Validations';
import ChangePasswordModal from './ChangePasswordModal';
import UserTextInput from '../../components/UserTextInput';

 /**
 * Account Info Componnet - User Details, Change password modal
 * @returns Account information
 */
const AccountInfo = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

 //State to handle Modal open and close
  const [passwordModal, setPasswordModal] = useState(false);
  const togglePasswordModal =()=>{
     setPasswordModal(!passwordModal);
  }
  // Address handling
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState(user?.address || textData.address);
  const [addressError, setAddressError] = useState("");
//handles save address
  const handleSaveAddress = () => {
    const error = validateAddressProfileScreen(address);
    setAddressError(error);
    if (error) return;

    dispatch(updateUser({ address }));
    setIsEditingAddress(false);
    Alert.alert("Success", "Address updated successfully!");
  };
  // handles edit nd save btn
  const handleEditSave = () => {
    if (isEditingAddress) {
      handleSaveAddress();
    } else {
      setIsEditingAddress(true);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.heading}>{textData.accountInformation}</Text>
      {/* Email and Change Password */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{textData.email}</Text>
        <Text style={styles.dataText}>{user?.email || "user@gmail.com"}</Text>
        <LinkHandler content="Change Password"onPress={togglePasswordModal}  textStyle={styles.dataText}  />
      </View>

      {/* Password Modal */}
      <ChangePasswordModal visible={passwordModal}onClose={togglePasswordModal} />

      {/* Personal Details */}
      <Text style={styles.heading}>{textData.personalDetails}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{textData.firstName}</Text>
        <Text style={styles.dataText}>{user?.firstName || textData.userFirstName}</Text>

        <Text style={styles.title}>{textData.lastName}</Text>
        <Text style={styles.dataText}>{user?.lastName || textData.userLastName}</Text>

        <Text style={styles.title}>{textData.phoneNumber}</Text>
        <Text style={styles.dataText}>{user?.phone || textData.userPhoneNo}</Text>
      </View>

      {/* Address */}
      <Text style={styles.heading}>{textData.address}</Text>
      <View style={styles.addressDetailContainer}>
        {!isEditingAddress ? (
          <Text style={styles.title}>{address}</Text>
        ) : (
          <>
            <UserTextInput
              value={address}
              type="address"
              onChangeText={(text) => {
                setAddress(text);
                setAddressError(validateAddressProfileScreen(text));
              }}
              containerStyle={styles.addressInput}/>
            {addressError ? ( <Text style={styles.errorText}>{addressError}</Text> ) : null}
          </>
        )}
         {/* edit& save button */}
        <LinkHandler onPress={handleEditSave} viewStyle={styles.editBtn}content={isEditingAddress ? textData.save : textData.edit} textStyle={styles.editBtnText}/>
      </View>
    </View>
  );
};

export default AccountInfo;
const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 7,
    marginHorizontal: 10,
  },
  detailsContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 14,
    color: colors.grey,
    marginVertical: 4,
    marginHorizontal: 5,
  },
  dataText: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 5,
    marginBottom: 8,
  },
  // Address
  addressDetailContainer: {
    borderWidth: 2,
    borderColor: colors.grey,
    borderRadius: 5,
    width: 350,
    minHeight: 120,
    margin: 10,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
    padding: 8,
    margin: 5,
    height: 80,
  },
  editBtn: {
    backgroundColor: colors.grey,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 5,
    alignSelf: "flex-end",
    margin: 5,
  },
  editBtnText: {
    color: colors.white,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginHorizontal: 5,
  },
});
