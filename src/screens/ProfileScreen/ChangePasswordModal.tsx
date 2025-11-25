import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, Alert } from "react-native";
import LinkHandler from "../../components/LinkHandler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../styles/colors";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUser } from "../../store/slices/userSlice";
import { textData } from "../../constants/text";
import { validatePassword,validateConfirmPassword, } from "../../constants/Validations";
import UserTextInput from "../../components/UserTextInput";

interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
}
/**
 * ChangePasswordModal component - contains old, new and confirm passwords with validations
 * @returns  ChangePasswordModal Ui
 */
const ChangePasswordModal = ({visible,onClose}: ChangePasswordModalProps) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

// state to maintain the passwords
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Inline error states
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  
  //handles submit button
   const handleSubmit = () => {
       console.log("Password:", user);
     console.log("Old Password:", user?.password);
    //Only compare old password
    if (user?.password !== oldPassword) {
      setOldPasswordError("Old password does not match");
      return;
    }
  //  const oldErr = validatePassword(oldPassword);
   const newErr = validatePassword(newPassword);
   const confirmErr = validateConfirmPassword( newPassword,confirmPassword);

    setNewPasswordError(newErr);
    setConfirmPasswordError(confirmErr);

    if ( newErr || confirmErr) return;

     //Prevent same old and new password
    if(oldPassword === newPassword){
      setNewPasswordError("Old and New password Should not be same");
      return;
    }

    dispatch(updateUser({ password: newPassword }));
    Alert.alert("Success", "Password changed successfully.");
    resetFields();
    // close modal
    onClose();
  };
  const resetFields = () => {
  setOldPassword("");
  setNewPassword("");
  setConfirmPassword("");
  setOldPasswordError("");
  setNewPasswordError("");
  setConfirmPasswordError("");
};


  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <LinkHandler viewStyle={styles.closeIcon} iconComponent={<Ionicons name="close" size={24} color={colors.black} />} 
            onPress={()=>{
             resetFields();
             onClose()
            }}
          />

          <Text style={styles.heading}>{textData.changePassword}</Text>
           {/* old password */}
            <UserTextInput
            containerStyle={styles.input}
            label={textData.oldPassword}
            value={oldPassword}
            type="password"
            onChangeText={setOldPassword}
            // error={oldPasswordError}
          />
          {oldPasswordError ? (<Text style={styles.errorText}>{oldPasswordError}</Text> ) : null}

           {/* new password */}
           <UserTextInput
            containerStyle={styles.input}
            label={textData.newPassword}
            value={newPassword}
            type="password"
            // error={newPasswordError}
            onChangeText={setNewPassword}
          />
          {newPasswordError ? (<Text style={styles.errorText}>{newPasswordError}</Text> ) : null}
           {/* confirm password */}
          <UserTextInput
            containerStyle={styles.input}
            label={textData.confirmPassword}
            value={confirmPassword}
            type="password"
            onChangeText={setConfirmPassword}
            // error={confirmPasswordError}
          />
          {confirmPasswordError ? (<Text style={styles.errorText}>{confirmPasswordError}</Text> ) : null}
          {/* button save */}
        <Button text={textData.save} onPress={handleSubmit} buttonStyle={{width:293}}/>
        </View>
      </View>
    </Modal>
  );
};

export default ChangePasswordModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: colors.modalOverlay,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  closeIcon: {
    alignSelf: "flex-end",
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  input: {
   borderRadius:5,
  },
   errorText: {
    fontSize: 12,
    color: "red",
    marginHorizontal:5,
   },
});
