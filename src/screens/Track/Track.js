import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight } from "react-native";
import styles from "./styles"; // Import the styles file
import { getOrders } from "../Orderdata/Orderdata"; // Replace with your order data source

export default function TrackOrderScreen(props) {
  const { navigation, route } = props;

  // Replace this with your order data retrieval logic
  const ordersArray = getOrders();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Track Your Order",
      headerRight: () => <View />,
    });
  }, [navigation]);

  const onPressOrder = (item) => {
    // Add navigation logic for viewing details of the selected order
  };

  const renderOrders = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressOrder(item)}
    >
      <View style={styles.container}>
        <Text style={styles.orderNumber}>Order #{item.orderNumber}</Text>
        <Text style={styles.orderStatus}>Status: {item.status}</Text>
        <Text style={styles.orderDate}>Order Date: {item.orderDate}</Text>
        <Text style={styles.deliveryAddress}>
          Delivery Address: {item.deliveryAddress}
        </Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={ordersArray}
        renderItem={renderOrders}
        keyExtractor={(item) => `${item.orderNumber}`}
      />
    </View>
  );
}
