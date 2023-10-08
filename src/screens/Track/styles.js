import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderStatus: {
    fontSize: 16,
    color: "green", // Customize color as needed
  },
  orderDate: {
    fontSize: 14,
    color: "#555",
  },
  deliveryAddress: {
    fontSize: 14,
    color: "#555",
  },
});

export default styles;
