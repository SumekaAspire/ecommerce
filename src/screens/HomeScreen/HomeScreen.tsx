import React, { useEffect, useState } from 'react';
import { View, Text ,StyleSheet, Image, ScrollView, ActivityIndicator} from 'react-native'
import { textData } from '../../constants/text';
import SearchBar from '../../components/SearchBar';
import HomeBanner from './HomeBanners';
import ProductList from './ProductList';
import { fetchproducts } from '../../services/api';

/**
 * HomeScreen Component
 * 
 */


const HomeScreen: React.FC = () => {
      const [searchProducts, setSearchProducts] = useState('')

  return (
    <View style={styles.container}>
      
     <SearchBar
       onChangeText={(text) =>setSearchProducts(text)}
       label='Search...'
      
     />
     <ScrollView
         showsVerticalScrollIndicator={true}
         contentContainerStyle={styles.scrollContent}
         nestedScrollEnabled={true}
     >
        <HomeBanner/>
        <ProductList searchProducts={searchProducts}/> 
     </ScrollView>
    </View>
  )
}

export default HomeScreen;

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        // margin:5
        // alignItems:"center",
        // justifyContent:"center"
    },
    scrollContent:{
      paddingBottom: 20
    }
  
})











// import React, { useEffect, useState } from 'react';
// import { View, Text ,StyleSheet, Image, ScrollView, ActivityIndicator} from 'react-native'
// import { textData } from '../../constants/text';
// import SearchBar from '../../components/SearchBar';
// import HomeBanner from './HomeBanners';
// import ProductList from './ProductList';
// import { fetchproducts } from '../../services/api';

// /**
//  * HomeScreen Component
//  * 
//  */


// const HomeScreen: React.FC = () => {

//    const [products, setProducts] = useState<any[]>([]);
//    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState<string | null>(null);
  
//       useEffect(() =>{
//           const loadProducts = async() =>{
//               try{
//                   const data = await fetchproducts();
//                   setProducts(data);
//                   setFilteredProducts(data); //initialize filtered products will all products
//               }catch(error){
//                   setError('Failed to load products');
//               }finally{
//                   setLoading(false);
//               }
//           }
  
//           loadProducts();
//       },[]);

//       if (loading) {
//     return (
//       <View>
//         <ActivityIndicator size="large" color="#888" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View>
//         <Text>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//      <SearchBar
//        data={products}
//        searchKey="title"
//        onSearch={setFilteredProducts}
      
//      />
//      <ScrollView
//          showsVerticalScrollIndicator={true}
//          contentContainerStyle={styles.scrollContent}
//          nestedScrollEnabled={true}
//      >
//         <HomeBanner/>
//         <ProductList products={filteredProducts}/> 
//      </ScrollView>
//     </View>
//   )
// }

// export default HomeScreen;

// const styles= StyleSheet.create({
//     container:{
//         flex:1,
//         backgroundColor:"white",
//         // margin:5
//         // alignItems:"center",
//         // justifyContent:"center"
//     },
//     scrollContent:{
//       paddingBottom: 20
//     }
  
// })