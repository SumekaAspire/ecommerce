import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, TouchableOpacity, } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { colors } from '../../styles/colors';
import { fetchproducts } from '../../services/api';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import Wishlist from '../../components/Wishlist';

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

interface ProductListProps {
searchProducts?: string;
}

const ProductList: React.FC<ProductListProps> = ({searchProducts}) => {
   
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const navigation:any = useNavigation();

  const handleProductDetailNavigation =(item: Product) =>{
    navigation.navigate("ProductDetail", {product:item})
  }

  // Fetch products once
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchproducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchProducts) return products;
    return products.filter((item) =>
      item.title.toLowerCase().includes(searchProducts.toLowerCase())
    );
  }, [products, searchProducts]);

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
      <View style={globalStyles.globalError}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  // No results
  if (filteredProducts.length === 0) {
    return (
      <View style={globalStyles.globalError}>
        <Text>No products found...</Text>
      </View>
    );
  }
    

  return (
    <FlatList
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) =>(
         <TouchableOpacity
         style={styles.productCard}
         onPress={() => handleProductDetailNavigation(item)}>
              <Wishlist style={styles.wishlistIcon}/>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productPrice}>₹{item.price}</Text>
         </TouchableOpacity>
        )}
       ItemSeparatorComponent={() => <View style={styles.itemSeparator}/>} 
    />
  )
}

export default ProductList

const styles= StyleSheet.create({
  productCard: {
    flex:1,
    justifyContent:"flex-start",
    alignItems:"center",
    backgroundColor: "#f6e6e6ff",
    borderRadius: 5,
    marginHorizontal: 5,
    padding: 5,
    marginTop:5,
    // position: 'relative', // connect with wishlist icon
    minHeight: 320, //ensures each card has the same height
   
  },
  image: {
    width: 160,
    height: 150,
    // borderRadius: 10,
    borderColor:colors.grey,
    borderWidth:2,
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
    backgroundColor:'transparent'
  },
    wishlistIcon:{
    top: 5,
    left:70,
   
 },

})




