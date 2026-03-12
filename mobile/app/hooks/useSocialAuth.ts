import { useSSO } from "@clerk/clerk-expo"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Alert } from "react-native"

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null)
  const { startSSOFlow } = useSSO()
  const router = useRouter()

  const handleSocialAuth = async (strategy: "oauth_google") => {
    if (loadingStrategy) return
    setLoadingStrategy(strategy)

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy })

      if (!createdSessionId || !setActive) {
        const provider = strategy === "oauth_google" ? "Google" : "Unknown"
        Alert.alert(
          "Sign in Incomplete",
          `${provider} sign-in did not complete. Please try again later.`
        )
        return
      }

      await setActive({ session: createdSessionId })

      // ✅ Explicitly navigate after session is active
      router.replace("/(tabs)")

    } catch (error) {
      console.log("Error in social auth:", error)
      const provider = strategy === "oauth_google" ? "Google" : "Unknown"
      Alert.alert("Error", `${provider} sign-in failed.`)
    } finally {
      setLoadingStrategy(null)
    }
  }

  return { handleSocialAuth, loadingStrategy }
}

export default useSocialAuth