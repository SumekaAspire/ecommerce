import { View, Text, Modal,TouchableOpacity, StyleSheet} from 'react-native'
import React,{useState} from 'react';
import { globalStyles } from '../styles/globalStyles';
import { textData, termsAndConditions } from '../constants/text';
import CheckBox from '@react-native-community/checkbox';
import { colors } from '../styles/colors';
import Toast from 'react-native-toast-message';

interface TermsAndConditionModalProps{
  onAccept: () => void; // callback function to notify when terms are accepted
}

/**
 * Reusable component - Displaying Modal and handling checkbox logic
 * @returns TermsAndCondtionsModal Component
 */
const TermsAndConditionsModal: React.FC<TermsAndConditionModalProps> = ({onAccept}) => {

    //Manage State for Modal Visibility and checkbox status
  const [isModalVisible, setModalVisible] = useState(false);
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);

  /**
   * HandleAccept - to check the checkbox is cliked or not,
   * if not, dispaly a toast to the user to clik the checkbox
   */
  const handleAccept =() =>{
    if(checkBoxChecked){
      onAccept();
      setModalVisible(false); //close the modal
    }else{
      Toast.show({
         type: 'error',
         text1: 'Please accept the terms and conditions to proceed.',
         position: "bottom",
       });
    }
  }
  return (
    <View>
      {/* Triggers to open modal(show the term and condition content) */}
      <TouchableOpacity onPress={()=> setModalVisible(true)}>
           <Text style={globalStyles.termCondition}>{textData.termsAndConditions}</Text>
      </TouchableOpacity>

     {/* Modal for terms and conditions */}
     <Modal
     visible={isModalVisible}
     transparent={true} //false - give white background //  backdropColor={"red"}
     animationType="slide"
     onRequestClose={() => setModalVisible(false)}
     >
     <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
          <Text style={styles.modalTextHeading}>{termsAndConditions.termsAndConditionsTitle}</Text>
          <Text style={globalStyles.termCondition}>{termsAndConditions.textForTermsAndConditions}</Text>
         
         {/* checkbox */}
            <View style={styles.checkBoxContainer}>
              <CheckBox
                 value={checkBoxChecked}
                 onValueChange={setCheckBoxChecked}
                 tintColors={{ true: "#ea8642ff", false: "#ea8642ff" }}
             />
           <Text style={styles.checkBoxText}>{termsAndConditions.acceptTermsAndConditions}</Text>
                        
          </View>

          {/* close button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleAccept}>
              <Text style={styles.closeButtonText}>{termsAndConditions.close}</Text>
          </TouchableOpacity>

      </View>
    </View> 
  </Modal>
</View>
  )
}

export default TermsAndConditionsModal

const styles = StyleSheet.create({

   modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '85%',
    padding: 20,
    backgroundColor: colors.PRIMARY_BACKGROUNDCOLOR,
    borderRadius: 10,
  },
  modalTextHeading: {
    fontSize: 16,
    marginBottom: 20,
    textAlign:'center',
    fontFamily: "AlanSans-Medium",
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin:20,

  },
  checkBoxText: {
    fontSize: 13,
    color: colors.black,
    fontFamily: "AlanSans-Medium",
  },
  closeButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: colors.formColor,
    borderRadius: 5
  },
  closeButtonText: {
    color: colors.PRIMARY_BACKGROUNDCOLOR,
    fontSize: 14,
    fontFamily: "AlanSans-Medium",
  }
})

