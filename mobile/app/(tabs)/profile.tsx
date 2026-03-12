import { View, Text, Pressable } from 'react-native'
import React from 'react'
import SafeScreen from '../components/SafeScreen'
import { useAuth } from '@clerk/clerk-expo'

const ProfileScreen = () => {
  const {signOut} = useAuth()
  return (
    <SafeScreen>
      <View>
      <Text>ProfileScreen</Text>
      <Pressable onPress={()=>signOut()}>
        <Text>Sign Out</Text>
      </Pressable>
      </View>
    </SafeScreen>
  )
}

export default ProfileScreen