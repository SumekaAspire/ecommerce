
import { View, Text, StyleSheet, Alert } from 'react-native'
import StepIndicator from 'react-native-step-indicator'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { colors } from '../../styles/colors'
import LinkHandler from '../../components/LinkHandler'
import { textData } from '../../constants/text'
import AddressDelivery from './AddressDelivery'
import Payment from './Payment'
import OrderConfirmation from './OrderConfirmation'

const labels =['Address', 'Payment' , 'Confirmation']
const customStyles={
  stepIndicatorSize: 30,
  currentStepIndicatorSize:40,
  separatorStrokeWidth: 4,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: colors.checkoutOrange,
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: colors.checkoutOrange,
  stepStrokeUnFinishedColor: colors.checkoutGrey,
  separatorFinishedColor: colors.checkoutOrange,
  separatorUnFinishedColor: colors.checkoutGrey,
  stepIndicatorFinishedColor: colors.checkoutOrange,
  stepIndicatorUnFinishedColor: colors.checkoutlightSandal,
  stepIndicatorCurrentColor: colors.checkoutlightSandal,
  stepIndicatorLabelFontSize: 14,
  currentStepIndicatorLabelFontSize: 12,
  stepIndicatorLabelCurrentColor: colors.checkoutOrange,
  stepIndicatorLabelFinishedColor: colors.checkoutlightSandal,
  stepIndicatorLabelUnFinishedColor: colors.checkoutGrey,
  labelColor: colors.checkoutGrey,
  labelSize: 13,
  currentStepLabelColor: colors.checkoutOrange,
}
/**
 * CheckoutPage
 * @returns Checkout for users order(with address, payment and confirmation)
 */
const CheckoutPage = () => {
    const[currentStep, setCurrentStep] = useState(0);
    const[isDeliveryAddressValid, setIsDeliveryAddressValid] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");// check paymentmethod is selected or not and which method is selected
    
    //update the state for previous  and next button 
    const handlePrevious=()=>{
      if(currentStep > 0 ){
         setCurrentStep(currentStep -1)
      }
    }
    const handleNext=()=>{
      // prevent next if current step is address and invalid
      if (currentStep === 0 && !isDeliveryAddressValid) {
         Alert.alert('Please fill in all required delivery details before continuing.')
         return
      }
      if (currentStep === 1 && !paymentMethod) {
         Alert.alert("Please select a payment option.");
         return;
      }
      if(currentStep < labels.length -1){
         setCurrentStep(currentStep +1)
      }
    }
//render the content based on the current position/step of the flow
    const renderStepContent =()=>{
        switch(currentStep){
            case 0:
               return <AddressDelivery onValidationChange={setIsDeliveryAddressValid}/>
            case 1:
               return <Payment onPaymentSelect={setPaymentMethod} />
            case 2:
               return<OrderConfirmation paymentMethod={paymentMethod}/>
            default:
               return null;      
                    
        }
    }
  return (
    <View style={[globalStyles.container]}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentStep}
          labels={labels}
          stepCount={labels.length} //libary assumes default value as 5, if didn't mention it
        />
        <View style={styles.contentContainer}>{renderStepContent()}</View>
        <View style={styles.buttonRow}>
           {(currentStep !== labels.length-1) &&(currentStep > 0) && 
            <LinkHandler content={textData.previous} onPress={handlePrevious} viewStyle={styles.button} textStyle={styles.buttonText}/>
           }
           {currentStep < labels.length -1 && 
           <LinkHandler content={textData.next} onPress={handleNext} 
          // viewStyle={styles.button} 
            viewStyle={ (currentStep === 0 && !isDeliveryAddressValid)  || (currentStep === 1 && !paymentMethod)? {...styles.button, backgroundColor: colors.grey }: styles.button}
           textStyle={styles.buttonText}/>
           }
        </View>
     
    </View>
  )
}

export default CheckoutPage;

const styles= StyleSheet.create({
  contentContainer:{
    flex:1,
    backgroundColor:colors.lightGrey,
    borderRadius:8,
    marginBottom:10,
    marginTop:10,
  },
  buttonRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  button:{
    backgroundColor:colors.orange,
    borderRadius:10,
    paddingVertical:10,
    paddingHorizontal:10,
  },
  buttonText:{
    color:colors.white,
    fontFamily:"AlanSans-Regular",
    fontSize:14
  },

})


