import { useAuth } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'
import React from 'react'

const App = () => {
  const {isSignedIn, isLoaded} = useAuth()
  if(!isLoaded) return null  //removes infinite loading glitch or Max depth reached
  if(!isSignedIn){
    return <Redirect href={"/(auth)"}/>
  }
  return <Redirect href="/(tabs)" />
}

export default App