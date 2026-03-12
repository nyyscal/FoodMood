import {
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  FlatList,
  Animated,
  PanResponder,
  Pressable,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import SafeScreen from "../components/SafeScreen";
import MapView, { LatLng, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { categories, locations, ORANGE } from "../lib/data";
import {  Location } from "../lib/types";
import { styles } from "../components/styles/map.styles";
import { Keyboard } from "react-native";


const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width - 40;

const Map = () => {
  const [filterActive, setFilterActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(2);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);

 const modalSlide = useRef(new Animated.Value(600)).current;
const [modalVisible, setModalVisible] = useState(false);

  const flatListRef = useRef<FlatList<Location>>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const mapRef = useRef<MapView>(null)

  const [searchQuery, setSearchQuery] = useState("");
const [debouncedQuery, setDebouncedQuery] = useState("");
const [searchResults, setSearchResults] = useState<Location[]>([]);
const [showSearchTray, setShowSearchTray] = useState(false);

useEffect(() => {
  setSelectedIndex(null);
  setSelectedLocationId(null);
}, [selectedCategory]);

  // Filter locations according to category
  let filteredLocations: Location[] = [];
  if (selectedCategory === 1) filteredLocations = locations; // All
  else if (selectedCategory === 2) filteredLocations = [...locations].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5); // Recent
  else filteredLocations = locations.filter(loc => loc.categoryId === selectedCategory); // Normal category

  // Automatically select first item
  useEffect(() => {
    if (filteredLocations.length > 0) {
      setSelectedIndex(0);
      setSelectedLocationId(filteredLocations[0].id);
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ 
          offset: 0, 
          animated: false 
        });
      }, 100);
    } else {
      setSelectedIndex(null);
      setSelectedLocationId(null);
    }
  }, [selectedCategory]);

 // Trigger zoom after component mounts
useEffect(() => {
  if (mapRef.current && locations.length > 0) {
    const coords: LatLng[] = locations.map(loc => ({
      latitude: loc.latitude,
      longitude: loc.longitude,
    }));

    mapRef.current.fitToCoordinates(coords, {
      edgePadding: { top: 100, right: 50, bottom: 150, left: 50 },
      animated: false, // false so it zooms immediately on load
    });
  }
}, []);

useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedQuery(searchQuery);
  }, 2000); // 2 seconds debounce

  return () => clearTimeout(handler);
}, [searchQuery]);

useEffect(() => {
  if (!debouncedQuery.trim()) {
    setSearchResults([]);
    setShowSearchTray(false);
    return;
  }

  const results = locations.filter(loc =>
    loc.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  setSearchResults(results);
  setShowSearchTray(true);
}, [debouncedQuery]);

  // Close Info Box
  const closeInfoBox = () => {
    Animated.timing(slideAnim, { toValue: 300, duration: 300, useNativeDriver: true }).start(() => {
      setSelectedIndex(null);
      setSelectedLocationId(null);
      slideAnim.setValue(0);
    });
  };

  // Pan responder for swipe down to close info box
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 5,
      onPanResponderMove: (_, gesture) => { 
        if (gesture.dy > 0) slideAnim.setValue(gesture.dy); 
      },
      onPanResponderRelease: (_, gesture) => { 
        if (gesture.dy > 80) {
          closeInfoBox();
        } else {
          Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  // Close search tray when clicking outside
  const closeSearchTray = () => {
    setShowSearchTray(false);
    setSearchQuery("");
      Keyboard.dismiss();

  };



const openModal = () => {
  setModalVisible(true);
  Animated.spring(modalSlide, {
    toValue: 0,
    useNativeDriver: true,
    tension: 65,
    friction: 11,
  }).start();
};

const closeModal = () => {
  Animated.timing(modalSlide, {
    toValue: 600,
    duration: 300,
    useNativeDriver: true,
  }).start(() => setModalVisible(false));
};

// Pan responder for swipe-down-to-close
const modalPanResponder = useRef(
  PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => g.dy > 10,
    onPanResponderMove: (_, g) => {
      if (g.dy > 0) modalSlide.setValue(g.dy);
    },
    onPanResponderRelease: (_, g) => {
      if (g.dy > 120 || g.vy > 0.5) {
        closeModal();
      } else {
        Animated.spring(modalSlide, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  })
).current;

  return (
    <SafeScreen>
      <View style={styles.container}>
        {/* Map */}
       <MapView
  ref={mapRef}
  style={styles.map}
  initialRegion={{
    latitude: 28.2096,
    longitude: 83.9856,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  }}
>
  {filteredLocations.map((loc, index) => (
  <Marker
    key={`${loc.id}-${selectedLocationId === loc.id ? 'selected' : 'unselected'}`}
    coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
    pinColor={selectedLocationId === loc.id ? "#042401f7" : "#FF0000"} 
    onPress={() => {
      setSelectedIndex(index);
      setSelectedLocationId(loc.id);
      
      // Scroll info card to the selected marker with proper offset
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ 
          offset: index * (CARD_WIDTH + 20), 
          animated: true 
        });
      }, 50);
      
      // Move map center to marker
      mapRef.current?.animateToRegion({
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }, 300);
    }}
  />
))}
</MapView>
       <View className="absolute top-14 left-4 right-4 z-50">

  {/* Search Tray Background Overlay - Click to close */}
  {showSearchTray && searchResults.length > 0 && (
    <Pressable 
      style={{
        position: 'absolute',
        top: 0,
        left: -16,
        right: -16,
        bottom: -1000,
        zIndex: -1,
      }}
      onPress={closeSearchTray}
    />
  )}

  {/* Search Tray (Behind Bar) */}
  {showSearchTray && searchResults.length > 0 && (
    <View
      className="absolute top-[20px] w-full bg-white rounded-xl shadow-lg max-h-[300px] z-0"
      style={{
        paddingTop: 45,    // space so results start below the search bar
        paddingHorizontal: 8,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {searchResults.map((loc) => (
          <TouchableOpacity
            key={loc.id}
            className="flex-row items-center p-2 border-b border-gray-100 rounded-lg"
            onPress={() => {
              const index = locations.findIndex(l => l.id === loc.id);

              setSelectedIndex(index);
              setSelectedLocationId(loc.id);

              setShowSearchTray(false);
              setSearchQuery("");

              mapRef.current?.animateToRegion({
                latitude: loc.latitude,
                longitude: loc.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }, 300);

              setTimeout(() => {
                flatListRef.current?.scrollToOffset({
                  offset: index * (CARD_WIDTH + 20),
                  animated: true
                });
              }, 200);
            }}
          >
            {/* Image */}
            <Image
              source={{ uri: loc.image }}
              className="w-12 h-12 rounded-full"
            />

            {/* Middle content */}
            <View className="flex-1 ml-3">
              <View className="flex-row items-center">
                <Text className="font-semibold text-lg mr-2">{loc.title}</Text>
                <Text className="font-semibold text-base mr-2">|</Text>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text className="ml-1 text-xs">{loc.rating}</Text>

                <Ionicons name="heart" size={14} color="red" style={{marginLeft:8}}/>
                <Text className="ml-1 text-xs">{loc.likes}</Text>
              </View>
              <Text numberOfLines={1} className="text-xs text-gray-500">
                {loc.description}
              </Text>
            </View>

            {/* Distance */}
            <View className="items-center">
              <Ionicons name="location-outline" size={18} color="#666"/>
              <Text className="text-xs text-gray-500">0 km</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )}

  {/* Search Bar */}
  <View className="flex-row items-center bg-white rounded-full px-4 py-3 shadow-md z-10 w-full">
    <Ionicons name="search-outline" size={22} color="#555" />
    <TextInput
      placeholder="Search location..."
      value={searchQuery}
      onChangeText={setSearchQuery}
      className="flex-1 ml-2 text-base"
      placeholderTextColor="#555"
    />
    <TouchableOpacity
      style={[styles.filterButton, filterActive && styles.filterActive]}
      onPress={() => setFilterActive(!filterActive)}
    >
      <Ionicons name="options-outline" size={22} color={filterActive ? ORANGE : "#555"} />
    </TouchableOpacity>
  </View>

</View>

        {/* Categories */}
        {filterActive && (
          <View style={styles.categoryContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10, alignItems: "center" }}>
              {categories.map(cat => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[styles.categoryItem, isSelected && styles.categoryItemSelected]}
                    onPress={() => setSelectedCategory(cat.id)}
                  >
                    <Ionicons name={cat.icon} size={22} color={isSelected ? ORANGE : "#555"} />
                    <Text style={[styles.categoryLabel, isSelected && { color: ORANGE }]}>{cat.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Swipeable Info Cards */}
        {selectedIndex !== null && filteredLocations[selectedIndex] && (
          <View style={styles.infoBoxContainer}>
            <FlatList
              key={`flatlist-${selectedCategory}`} 
              ref={flatListRef}
              data={filteredLocations}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              snapToInterval={CARD_WIDTH + 20}
              snapToAlignment="start"
              decelerationRate="fast"
              contentContainerStyle={{ paddingRight: 20 }}
              getItemLayout={(_, index) => ({ 
                length: CARD_WIDTH + 20, 
                offset: (CARD_WIDTH + 20) * index, 
                index 
              })}
              onScrollToIndexFailed={info => { 
                setTimeout(() => { 
                  flatListRef.current?.scrollToOffset({ 
                    offset: info.index * (CARD_WIDTH + 20), 
                    animated: true 
                  }); 
                }, 200); 
              }}
              onMomentumScrollEnd={e => {
                const index = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + 20));
                setSelectedIndex(index);
                setSelectedLocationId(filteredLocations[index]?.id || null);

                // Animate map to the selected location
                const loc = filteredLocations[index];
                if (loc) {
                  mapRef.current?.animateToRegion({
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  }, 300);
                }
              }}
              renderItem={({ item, index }) => (
                <View style={{ width: CARD_WIDTH, marginRight: 20 }}>
                  <TouchableOpacity activeOpacity={0.9} onPress={openModal}>
  <Animated.View
    style={[styles.infoBox, { transform: [{ translateY: slideAnim }] }]}
    {...panResponder.panHandlers}
  >
                    <Text style={styles.counter}>{index + 1}/{filteredLocations.length}</Text>
                    <Image source={{ uri: item.image }} style={styles.infoImage} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.infoTitle}>{item.title}</Text>
                      <Text style={styles.infoDescription}>{item.description}</Text>
                      <View style={styles.infoRow}>
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text style={{ marginLeft: 5 }}>{item.rating}</Text>
                        <Ionicons name="heart" size={16} color="red" style={{ marginLeft: 15 }} />
                        <Text style={{ marginLeft: 5 }}>{item.likes}</Text>
                        <Ionicons name="share-social-outline" size={16} color="#555" style={{ marginLeft: 15 }} />
                      </View>
                    </View>
                  </Animated.View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
      </View>
      {modalVisible && selectedIndex !== null && filteredLocations[selectedIndex] && (
  <Pressable 
    style={StyleSheet.absoluteFillObject} 
    onPress={closeModal}
    // Semi-transparent backdrop
    className="bg-black/40 justify-end"
  >
    <Animated.View
      style={[
        styles.bottomModal,
        { transform: [{ translateY: modalSlide }] },
      ]}
      {...modalPanResponder.panHandlers}
    >
      {/* Intercept taps so they don't close the modal */}
      <Pressable onPress={e => e.stopPropagation()}>

        {/* Drag Handle */}
        <View style={{
          width: 40, height: 4, borderRadius: 2,
          backgroundColor: '#ccc', alignSelf: 'center', marginBottom: 12,
        }} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={{ uri: filteredLocations[selectedIndex].image }}
            style={{ width: '100%', height: 200, borderRadius: 12, marginBottom: 16 }}
          />

          {/* Title + Rating Row */}
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-2xl font-bold text-orange-400 flex-1 mr-2">
              {filteredLocations[selectedIndex].title}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={18} color="#FFD700" />
              <Text className="ml-1 text-sm text-gray-700">
                {filteredLocations[selectedIndex].rating}
              </Text>
              <Text className="mx-2 text-gray-300">|</Text>
              <Ionicons name="heart" size={18} color="red" />
              <Text className="ml-1 text-sm text-gray-700">
                {filteredLocations[selectedIndex].likes}
              </Text>
            </View>
          </View>

          {/* Tags */}
          <View className="flex-row flex-wrap gap-2 mb-4">
            {filteredLocations[selectedIndex].tags.map(tag => (
              <TouchableOpacity
                key={tag.id}
                className="flex-row items-center bg-orange-50 border border-orange-200 px-3 py-1 rounded-full"
              >
                <Ionicons name={tag.icon as any} size={13} color="#f97316" />
                <Text className="ml-1 text-xs text-orange-600 font-medium">
                  {tag.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Description */}
          <Text className="text-gray-600 text-[15px] leading-6 mb-6">
            {filteredLocations[selectedIndex].description}
          </Text>
        </ScrollView>

      </Pressable>
    </Animated.View>
  </Pressable>
)}
    </SafeScreen>
  );

};

export default Map;

// import { View, Text } from 'react-native'
// import React from 'react'

// const Map = () => {
//   return (
//     <View>
//       <Text>Map</Text>
//     </View>
//   )
// }

// export default Map