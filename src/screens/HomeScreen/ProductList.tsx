import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Modal, } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { colors } from '../../styles/colors';
import { fetchproducts } from '../../services/api';
import { globalStyles } from '../../styles/globalStyles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Wishlist from '../../components/Wishlist';
import LinkHandler from '../../components/LinkHandler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { textData } from '../../constants/text';
import Filters from '../../components/Filters';

/**
 * Product List component
 * @returns 
 */
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: string;
};
const ProductList = ({route, navigation}:any) => {
  const { searchProducts } = route?.params || {}; // value coming from navigation
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const navigations:any = useNavigation();
  //sort
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
//handles detailProductView navigation
  const handleProductDetailNavigation =(item: Product) =>{
    navigations.navigate("ProductDetail", {product:item})
  }
  // Fetch products once
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchproducts();
        setProducts(data);
        setOriginalProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

/**Reset products to original list whenever the screen is focused
 * When the user navigates away from the screen and then comes back, React Native does not unmount the component by default. Instead, the component remains in memory, and its state persists.
Without useFocusEffect, the products state would retain its last value (e.g., sorted order) when the user revisits the screen.
By using useFocusEffect, we ensure that the products state is reset to its original unsorted state every time the screen is focused.
 */
  useFocusEffect(
    useCallback(() => { //improves performance by avoiding unnecessary re-renders or re-executions of the effect.
      setProducts(originalProducts); // Reset to original list
      setSelectedSort(""); // Reset sort selection
    }, [originalProducts])
  );

  // loading 
  if (loading) {
    return (
      <View >
        <ActivityIndicator size="large" color={colors.ORANGE_COLOR || '#f57c00'} />
      </View>
    );
  }

  // if error while getting data
  if (error) {
    return (
      <View style={[globalStyles.globalError, styles.errorAlignment]}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }
// handles toggle sort modal and apply button
  const onToggleSortOpen =()=>{
   setModalVisible(!isModalVisible);
  }
  const applySort =()=>{
    let sortedProducts =[...products];
    if(selectedSort === "low-high"){
      sortedProducts.sort((a,b) => a.price -b.price);
    }else if (selectedSort === "high-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
    }
     setProducts(sortedProducts);
     onToggleSortOpen(); // close modal
  }
  
  return (
   <View>  
    <Filters/>
      <LinkHandler  viewStyle={styles.sortBtn} content={textData.sort} onPress={onToggleSortOpen} iconComponent={ <Ionicons name="options" size={20} color={colors.black}/>}/>
      <Modal visible={isModalVisible} animationType='fade' transparent={true}>
        <View style={styles.modaloOverlay}>
          {/* closeButton */}
          <LinkHandler viewStyle={styles.closeIcon}iconComponent={<Ionicons name={textData.closeIcon} size={24} color={colors.black} />} onPress={onToggleSortOpen} />
          <View style={styles.modalBox}>
              {/* Sorting Options */}
            <TouchableOpacity  style={[styles.optionBtn, selectedSort === "low-high" && styles.selectedOption]}
             onPress={() => setSelectedSort("low-high")} >
               <Text>{textData.lowToHigh}</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={[styles.optionBtn, selectedSort === "high-low" && styles.selectedOption]}
             onPress={() => setSelectedSort("high-low")} >
                <Text>{textData.highToLow}</Text>
            </TouchableOpacity>
            {/* apply button */}
            <LinkHandler content={textData.apply} viewStyle={styles.applyBtn} onPress={applySort} textStyle={styles.textApply}/>
         </View>     
       </View>
     </Modal>
    <FlatList
      scrollEnabled={false}
      nestedScrollEnabled={true} //allows flatlist to scroll inside scrollview
      showsVerticalScrollIndicator={false}
      numColumns={2}
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) =>(
         <TouchableOpacity
         style={styles.productCard}
         onPress={() => handleProductDetailNavigation(item)}>
              <Wishlist style={styles.wishlistIcon} product={item}/>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productPrice}>₹{item.price}</Text>
         </TouchableOpacity>
        )}
       ItemSeparatorComponent={() => <View style={styles.itemSeparator}/>} 
    />
   </View>
  )
}

export default ProductList
const styles= StyleSheet.create({
  productCard: {
    flex:1,
    justifyContent:"flex-start",
    alignItems:"center",
    backgroundColor: "#f6f3f3ff",
    borderRadius: 5,
    marginHorizontal: 5,
    padding: 5,
    marginTop:5,
    // position: 'relative', // connect with wishlist icon
    minHeight: 320, //ensures each card has the same height
  },
  image: {
    width: 160,
    height: 150,// borderRadius: 10, // borderColor:colors.grey, // borderWidth:2,
    alignItems:"center",
    margin:5,
    marginTop:10, 
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    textAlign:"center"
  },
  productPrice:{
    color: colors.ORANGE_COLOR,
    fontSize: 15,
    marginTop: 3,
    textAlign:"center"
  },
  itemSeparator:{
    height:5,
    backgroundColor:'transparent', //backgroundColor:'#888',
  },
   wishlistIcon:{
    top: 5,
    left:70,  
 },
errorAlignment:{
   alignItems:'center',
   justifyContent:'center'
},
sortBtn:{ 
  flexDirection:'row',
  width: 70,
  borderRadius:5,
  height:35,
  alignItems:'center',
  justifyContent:'space-between',
  backgroundColor:colors.ORANGE_COLOR,
  borderColor:colors.black,
  borderWidth:2,
  margin:5,
  paddingHorizontal:5,
  alignSelf:'flex-end',
},
modaloOverlay: {
  flex: 1,
  backgroundColor:colors.modalOverlay ,
  justifyContent: "center",
  alignItems: "center",
},
modalBox: {
  width: "90%",
  backgroundColor: colors.white,
  padding: 20,
  borderRadius: 10,
  elevation: 5
},
textApply: {
  color: colors.white, 
  fontWeight: "bold" 
},
optionBtn: {
  padding: 12,
  borderWidth: 1,
  borderColor: colors.checkoutGrey,
  borderRadius: 5,
  marginVertical: 5
},
selectedOption: {
  backgroundColor: colors.selectedOption,
  borderColor: colors.ORANGE_COLOR,
},
applyBtn: {
  marginTop: 15,
  backgroundColor: colors.ORANGE_COLOR,
  padding: 12,
  borderRadius: 5,
  alignItems: "center",
},closeIcon:{
  position: "absolute",
  top: 250,
  right: 15,
  backgroundColor: colors.white,
  padding: 5,
  borderRadius: 20, // makes it circular
}
})





