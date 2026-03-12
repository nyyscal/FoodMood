import { Dimensions } from "react-native";
import { Location } from "./types";
const { width, height } = Dimensions.get("window");

export const ORANGE = "#FFA500"; // subtle hint for selected icon

export const locations: Location[] = [
{
  id: 1,
  title: "Coffee Box",
  description: "Best coffee in town",
  categoryId: 4,
  latitude: 28.2096,
  longitude: 83.9856,
  image: "https://picsum.photos/200/120?1",
  rating: 4.5,
  likes: 120,
  createdAt: 6,
  tags: [
    { id: 1, title: "Coffee", icon: "cafe-outline" },
    { id: 2, title: "Chill", icon: "leaf-outline" },
    { id: 3, title: "WiFi", icon: "wifi-outline" },
  ],
},

{
  id: 2,
  title: "Pokhara Trade Mall",
  description: "Shopping center",
  categoryId: 6,
  latitude: 28.2136,
  longitude: 83.982,
  image: "https://picsum.photos/200/120?2",
  rating: 4.2,
  likes: 85,
  createdAt: 5,
  tags: [
    { id: 1, title: "Shopping", icon: "bag-outline" },
    { id: 2, title: "Food", icon: "restaurant-outline" },
    { id: 3, title: "Clothes", icon: "shirt-outline" },
  ],
},

{
  id: 3,
  title: "Giant Gym",
  description: "Open 24/7",
  categoryId: 7,
  latitude: 28.21,
  longitude: 83.986,
  image: "https://picsum.photos/200/120?3",
  rating: 4.8,
  likes: 150,
  createdAt: 4,
  tags: [
    { id: 1, title: "Workout", icon: "barbell-outline" },
    { id: 2, title: "Fitness", icon: "fitness-outline" },
    { id: 3, title: "24/7", icon: "time-outline" },
  ],
},

{
  id: 4,
  title: "Eat Street",
  description: "Local cuisines",
  categoryId: 3,
  latitude: 28.208,
  longitude: 83.984,
  image: "https://picsum.photos/200/120?4",
  rating: 4.6,
  likes: 200,
  createdAt: 3,
  tags: [
    { id: 1, title: "Food", icon: "restaurant-outline" },
    { id: 2, title: "Street Food", icon: "fast-food-outline" },
    { id: 3, title: "Local", icon: "earth-outline" },
  ],
},

{
  id: 5,
  title: "QFX Cinemas",
  description: "Latest movies",
  categoryId: 8,
  latitude: 28.2115,
  longitude: 83.983,
  image: "https://picsum.photos/200/120?5",
  rating: 4.4,
  likes: 95,
  createdAt: 2,
  tags: [
    { id: 1, title: "Movies", icon: "film-outline" },
    { id: 2, title: "Popcorn", icon: "fast-food-outline" },
    { id: 3, title: "Entertainment", icon: "game-controller-outline" },
  ],
},

{
  id: 6,
  title: "Hotel Barahi",
  description: "Luxury rooms",
  categoryId: 4,
  latitude: 28.2125,
  longitude: 83.987,
  image: "https://picsum.photos/200/120?6",
  rating: 4.9,
  likes: 75,
  createdAt: 1,
  tags: [
    { id: 1, title: "Hotel", icon: "bed-outline" },
    { id: 2, title: "Luxury", icon: "diamond-outline" },
    { id: 3, title: "Lake View", icon: "water-outline" },
  ],
},
];

  export const categories = [
    { id: 1, label: "All", icon: "grid-outline" },
    { id: 2, label: "Recent", icon: "timer-outline" },
    { id: 3, label: "Food", icon: "fast-food-outline" },
    { id: 4, label: "Cafe", icon: "cafe-outline" },
    { id: 5, label: "Cycling", icon: "bicycle-outline" },
    { id: 6, label: "Shopping", icon: "cart-outline" },
    { id: 7, label: "Gym", icon: "barbell-outline" },
    { id: 8, label: "Entertainment", icon: "tv-outline" },
    { id: 9, label: "Hotel", icon: "bed-outline" },
    { id: 10, label: "Hospital", icon: "heart-outline" },
  ];