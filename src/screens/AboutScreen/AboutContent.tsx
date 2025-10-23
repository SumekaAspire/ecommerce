import { View, Text } from 'react-native'
import React from 'react'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { DrawerStack } from '../../navigations/AppNavigation'

//type for AboutContent screen props
type AboutContent = DrawerScreenProps<DrawerStack, 'About'>;

/**
 * AboutContent Component
 * 
 */
const AboutContent = () => {
  return (
    <View>
      <Text>AboutContent</Text>
    </View>
  )
}

export default AboutContent