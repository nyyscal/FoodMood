import React from 'react'
import { Alert, Image, Pressable, ScrollView, Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import useSocialAuth from '../hooks/useSocialAuth'

const Login = () => {
  const {handleSocialAuth, loadingStrategy} = useSocialAuth()
  const isLoading = loadingStrategy !== null
 
  return (
    <SafeAreaView style={{flex:1, justifyContent: "center", alignItems:"center"}}>
      <ScrollView contentContainerStyle={{
        flex:1,
        justifyContent:"center",
      }} keyboardShouldPersistTaps="handled">
        <Image source={require("../../assets/images/instagram.png")}
        resizeMode="contain"
        style={{
          alignSelf: "center",
          width: 120,
          height: 120,
          marginBottom: 35,
        }}
        />
       
        <Pressable
  style={{
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    borderRadius: 8,
    width: 260,
    opacity: isLoading ? 0.5 : 1, // show disabled effect
  }}
  onPress={() => handleSocialAuth("oauth_google")}
  disabled={isLoading} // prevent double taps
>
  <Image
    source={{ uri: "https://cdn-icons-png.flaticon.com/512/300/300221.png" }}
    style={{ width: 20, height: 20, marginRight: 10 }}
  />
  <Text style={{ fontSize: 16 }}>Continue with Google</Text>
</Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login