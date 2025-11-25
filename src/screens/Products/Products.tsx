import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ProductList from '../HomeScreen/ProductList'


/**
 * Product Listing Componnet
 * @returns Product listing view
 */
const Products = () => {
  return (
     <ScrollView> 
        <ProductList />
    </ScrollView>
  )
}

export default Products