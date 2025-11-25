import { View, Text, StyleSheet } from 'react-native'
import React, {useState}from 'react'
import {Rating,AirbnbRating } from 'react-native-ratings'

/**
 * Ratings Component - displays star(ratings) to the user, can provide ratings which displays text based on the ratings
 * @returns Ratings UI
 */
const RatingsComponent = () => {
    const [rating, setRating]= useState(0)
  return (
    <View style={styles.ratingsView}>  
      <Rating
        type='custom'
        ratingCount={5}
        imageSize={30}
        startingValue={rating}
        onFinishRating={setRating}
        tintColor="#f2f0f0ff"
        ratingBackgroundColor='#888'
      />
    </View>
  )
}

export default RatingsComponent

const styles= StyleSheet.create({
  ratingsView:{
   //backgroundColor:'red',
   marginBottom:15,
   
}
})