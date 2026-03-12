import { Ionicons } from "@expo/vector-icons"
import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ORANGE = "#FFA500"; // subtle hint for selected icon
const TabsLayout = () => {
  const insets = useSafeAreaInsets()
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarStyle:{
        paddingTop: 8,
        height: 40 + insets.bottom,
        marginBottom: insets.bottom,
        borderRadius:24,
        position:"absolute",
        borderTopWidth:0,
        marginHorizontal:30,
        overflow:"hidden",
      },
      tabBarShowLabel:false
    }}>
      
      {/* Home */}
      <Tabs.Screen name='index' 
        options={{
          title:"Home",
          tabBarIcon:({focused}) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.bgHighlight} />}
              <Ionicons name="grid" size={26} color={focused ? ORANGE :"#555"}/>
            </View>
          )
        }}
      />

      {/* Explore */}
      <Tabs.Screen name='explore' 
        options={{
          title:"Explore",
          tabBarIcon:({focused}) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.bgHighlight} />}
              <Ionicons name="compass-outline" size={26} color={focused ? ORANGE :"#555"}/>
            </View>
          )
        }}
      />

      {/* Map */}
      <Tabs.Screen name='map' 
        options={{
          title:"Map",
          tabBarIcon:({focused}) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.bgHighlight} />}
              <Ionicons name="location-outline" size={26} color={focused ? ORANGE :"#555"}/>
            </View>
          )
        }}
      />
      
      {/* Promo */}
      <Tabs.Screen name='promo' 
        options={{
          title:"Promo",
          tabBarIcon:({focused}) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.bgHighlight} />}
              <Ionicons name="ribbon-outline" size={26} color={focused ? ORANGE :"#555"}/>
            </View>
          )
        }}
      />

      {/* Profile */}
      <Tabs.Screen name='profile' 
        options={{
          title:"Profile",
          tabBarIcon:({focused}) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.bgHighlight} />}
              <Ionicons name="person-outline" size={26} color={focused ? ORANGE :"#555"}/>
            </View>
          )
        }}
      />

    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({
  iconContainer: {
    width: 40, 
    height: 40, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  bgHighlight: {
    position: 'absolute',
    width: 60,
    height: 50,
    borderRadius: 18,
    backgroundColor: 'rgba(255,165,0,0.2)',
  },
});