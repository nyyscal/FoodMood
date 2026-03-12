import { Pressable, Text, View } from "react-native";
import SafeScreen from "../components/SafeScreen";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, router } from "expo-router";
import { useUserSync } from "@/hooks/useUserSync";

export default function Index() {
  const {isSignedIn, isLoaded, signOut, userId} = useAuth()
  useUserSync()
  if(!isLoaded) return null
  if(!isSignedIn){
    return <Redirect href={"/(auth)"}/>
  }
  const handleSignOut = async () => {
  await signOut()
  router.replace("/(auth)") 
}
  return (
    <SafeScreen>
    <View>
      <Text className="text-blue-800">Edit app/index.tsx to edit this screen.</Text>
    </View>
     <Pressable onPress={handleSignOut}>
            <Text>Sign Out</Text>
            <Text>{JSON.stringify(userId)}</Text>
          </Pressable>
    </SafeScreen>
  );
}
