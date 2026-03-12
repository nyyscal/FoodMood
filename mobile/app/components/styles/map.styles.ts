import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export const CARD_WIDTH = width - 40;

// --- Styles ---
export const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },

  searchContainer: { position: "absolute", top: 25, left: width * 0.05, width: width * 0.9, height: 55, flexDirection: "row", backgroundColor: "#fff", borderRadius: 28, paddingHorizontal: 14, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 5, elevation: 6 },
  icon: { marginRight: 10 },
  input: { flex: 1, height: "100%", fontSize: 16, color: "#000" },
  filterButton: { padding: 8, borderRadius: 20 },
  filterActive: { backgroundColor: "rgba(255,165,0,0.2)" },

  categoryContainer: { position: "absolute", top: 115, left: width * 0.07, width: width * 0.85, height: 58, backgroundColor: "#fff", borderRadius: 20, elevation: 4, justifyContent: "center" },
  categoryItem: { width: 70, alignItems: "center", marginRight: 10, paddingVertical: 6, borderRadius: 20 },
  categoryItemSelected: { backgroundColor: "rgba(255,165,0,0.2)" },
  categoryLabel: { fontSize: 12, marginTop: 4, color: "#555" },

  infoBoxContainer: { position: "absolute", bottom: 80 },
  infoBox: { width: CARD_WIDTH, marginHorizontal: 20, flexDirection: "row", backgroundColor: "#fff", borderRadius: 15, padding: 10, elevation: 6 },
  counter: { position: "absolute", top: 6, right: 10, fontSize: 12, color: "#888", fontWeight: "600" },
  infoImage: { width: 80, height: 80, borderRadius: 10 },
  infoTitle: { fontWeight: "bold", fontSize: 16 },
  infoDescription: { fontSize: 14, color: "#555", marginVertical: 4 },
  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  modalOverlay: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  justifyContent: "flex-end",
},

bottomModal: {
  backgroundColor: 'white',
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  padding: 20,
  paddingTop: 12,
  maxHeight: '80%',
  // Shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -3 },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 20,
},

dragHandle: {
  width: 50,
  height: 5,
  backgroundColor: "#ccc",
  alignSelf: "center",
  borderRadius: 5,
  marginBottom: 10,
},

closeBtn: {
  position: "absolute",
  right: 15,
  top: 10,
  zIndex: 10,
},

modalImage: {
  width: "100%",
  height: 200,
  borderRadius: 10,
  marginBottom: 15,
},

modalTitle: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 10,
},

modalDescription: {
  fontSize: 15,
  color: "#555",
  lineHeight: 22,
},

modalRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 15,
},

});