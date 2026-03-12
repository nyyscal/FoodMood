import { Ionicons } from "@expo/vector-icons";

export type Location = {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  latitude: number;
  longitude: number;
  image: string;
  rating: number;
  likes: number;
  createdAt: number;
  tags: LocationTag[]
};

type LocationTag = {
  id: number
  title: string
  icon: keyof typeof Ionicons.glyphMap
}

export type Category = {
  id: number;
  label: string;
  icon: string;
};

export type LatLng ={
  latitude: number,
  longitude: number,
}