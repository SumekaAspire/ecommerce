import { View, Text, StyleSheet, Modal, Dimensions } from 'react-native'
import React, { useState } from 'react'
import LinkHandler from './LinkHandler'
import { key, textData } from '../constants/text'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../styles/colors'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import RadioButton from './RadioButton'
import CheckboxContent from './CheckBox'

//for calucalting the widh of the screen
const { width } = Dimensions.get("window");
/**
 * Filter componnet has price range and select gender functionality
 * @returns Filters Ui
 */
const Filters = () => {
    //state to maintain modal visibility and active filter
    const[isFilterVisible, setIsFilterVisible] = useState(false);
    const[activeFilter, setActiveFilter] = useState("price");
    //state to update min and max price in range 
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    const[selected, setSelected]= useState({men: false, women: false,jewellery: false,});//object state that tracks selected categories.

    //handle filter button visibility
    const toggleFilterOpen =() =>{
      setIsFilterVisible(!isFilterVisible);
    }
    const handleReset=()=>{
         setMinPrice(0);
         setMaxPrice(1000);
         setSelected({ men: false, women: false, jewellery: false });
    }
    const handleApply=()=>{

    }
    //toggle selected checkbox based on key
    const toggleSelected = (key: keyof typeof selected) => {//keyof typeof selected - "men" | "women" | "jewellery"
       setSelected((prev) => ({
        //Copy all old values using spread: ...prev,Flip the boolean of the key passed(true-> false, and false-> true)
        ...prev,[key]: !prev[key],
  }));
}
  return (
   <View>
      <LinkHandler  viewStyle={styles.filterBtn} content={textData.filter} onPress={toggleFilterOpen} iconComponent={ <Ionicons name="options" size={20} color={colors.black}/>}/>
      <Modal visible={isFilterVisible} animationType='fade' transparent={true}>
        <View style={styles.filterContainer}>
          <LinkHandler viewStyle={styles.closeIcon} iconComponent={<Ionicons name="close" size={24} color={colors.black} />} onPress={toggleFilterOpen}/>
         <View style={styles.modalContainer}>
          <View style={styles.separateContainer}>
             <View style={styles.leftContainer}>
               <Text style={[styles.leftItem, activeFilter==="price" && styles.activeLeftItem]} onPress={() =>setActiveFilter("price")}>Price</Text>
               <Text style={[styles.leftItem, activeFilter==="categories" && styles.activeLeftItem]} onPress={() =>setActiveFilter("categories")}>Categories</Text>
             </View>
            <View style={styles.rightContainer}>
              {activeFilter === "price" &&(
                <View>
                 <Text>Range:</Text>
                 <MultiSlider
                   values={[minPrice,maxPrice]}
                   onValuesChange={(values)=>{
                    setMinPrice(values[0]);
                    setMaxPrice(values[1]);
                   }}
                   min={0}
                   max={1000}
                   sliderLength={width*0.47} // layout may effect because right container has padding + margin
                   containerStyle={{marginHorizontal:10}}
                   step={1}
                   trackStyle={{ height: 4 }}
                   selectedStyle={{ backgroundColor: colors.grey }}   
                   unselectedStyle={{ backgroundColor: colors.lightGrey }}     
                   markerStyle={{height: 20,width: 20,borderRadius: 10,backgroundColor: colors.grey,}}
                  />
                   <View style={styles.rangePriceView}>
                    <Text>Min: ₹{minPrice} </Text>
                    <Text>Max: ₹{maxPrice}</Text>
                 </View>   
                </View>
              )}
               {activeFilter === "categories" &&(
                <View>
                   <CheckboxContent value={selected.men} onValueChange={() =>toggleSelected("men")} tintColors={{true: colors.ORANGE_COLOR, false: colors.ORANGE_COLOR}} textContent={textData.men}/>
                   <CheckboxContent value={selected.women} onValueChange={() =>toggleSelected("women")} tintColors={{true: colors.ORANGE_COLOR, false: colors.ORANGE_COLOR}} textContent={textData.women}/>
                   <CheckboxContent value={selected.jewellery} onValueChange={() =>toggleSelected("jewellery")} tintColors={{true: colors.ORANGE_COLOR, false: colors.ORANGE_COLOR}} textContent={textData.jewellery}/>
                </View>    
              )}
            </View>

          </View>
        </View>
        <View style={styles.button}>
           <LinkHandler viewStyle={styles.buttonstyle} content={textData.reset} onPress={handleReset} textStyle={{color:colors.white}}/>
           <LinkHandler viewStyle={styles.buttonstyle} content={textData.apply} onPress={handleApply} textStyle={{color:colors.white}}/>
          </View>
        </View>
      </Modal>
   </View>  
)}

export default Filters

const styles= StyleSheet.create({
filterBtn:{
  flexDirection:'row',
  width: 80,
  borderRadius:5,
  height:35,
  alignItems:'center',
  justifyContent:'space-between',
  backgroundColor:colors.ORANGE_COLOR,
  borderColor:colors.black,
  borderWidth:2,
  margin:5,
  paddingHorizontal:5,
  },
  filterContainer:{
    flex:1,
    backgroundColor:colors.modalOverlay,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer:{
    width: "95%",
    backgroundColor: colors.sandal,
    borderRadius: 10,
    padding: 10,
    margin:10,
  },
  closeIcon:{
    position: "absolute",
    top: 250,
    right: 15,
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 20, // makes it circular
  },
  button:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:"80%",
  },
  buttonstyle:{
    backgroundColor:colors.orange,
    borderRadius: 5,
    padding:12, 
    width:"30%",
    alignItems:"center",
  },
  separateContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  leftContainer:{
    width: "35%",
    borderRightWidth: 1,
    borderColor: colors.grey,
    backgroundColor:colors.white,
    borderRadius:5,
    padding:5,
  },
  rightContainer:{
    width:"63%",
    backgroundColor:colors.white,
    borderRadius:5,
    padding:10
  },
  leftItem: {
    paddingVertical: 7,
    fontSize: 16,
    color: colors.black,
    textAlign:"center",
  },
  activeLeftItem: {
    backgroundColor: colors.orange,
    color: colors.white,
    borderRadius: 5,
    paddingHorizontal: 5,
    fontWeight:"bold"
  },
  rangePriceView:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:10,
  }


})