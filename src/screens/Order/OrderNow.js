import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, TextInput, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { users, executives } from "../../data/dataArrays";
import RNPickerSelect from 'react-native-picker-select';

const OrderNow = () => {
  const user = users[0];
  const [productName, setProductName] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverContact, setReceiverContact] = useState('');
  const [receiverLocation, setReceiverLocation] = useState('');
  const [assignedExecutive, setAssignedExecutive] = useState(null); // Track assigned executive

  const productCategories = [
    { label: 'Food', value: 'Food' },
    { label: 'Medicines', value: 'Medicines' },
    { label: 'Groceries', value: 'Groceries' },
  ];

  const handleExecutivePress = (executive) => {
    if (assignedExecutive && assignedExecutive.id === executive.id) {
      // If the same executive is assigned, unassign them
      setAssignedExecutive(null);
      Alert.alert('Unassigned', `You have unassigned ${executive.name}.`);
    } else {
      // Unassign any previously assigned executive
      if (assignedExecutive) {
        Alert.alert('Unassigned', `You have unassigned ${assignedExecutive.name}.`);
      }
      setAssignedExecutive(executive);
      Alert.alert('Assigned', `You have assigned ${executive.name}.`);
    }
  };



  const checkWeightLimit = () => {
    if (parseInt(productWeight) > 15) {
      Alert.alert("Limit Exceeded", "Product weight should not exceed 15 kg");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userDetails}>
        <Text style={styles.label}>Name: {user.name}</Text>
        <Text style={styles.label}>Contact: {user.Contact}</Text>
        <Text style={styles.label}>Location: {user.location}</Text>
      </View>

      <Text style={styles.nearbyExecutivesHeader}>See Your Nearby Executives</Text>
     <FlatList
       data={executives}
       renderItem={({ item }) => (
         <View style={styles.executiveItem}>
           <Text style={styles.executiveName}>{item.name}</Text>
           <Text style={styles.executiveTime}>{item.time} mins</Text>
           <TouchableOpacity
             style={[
               styles.assignButton,
               {
                 backgroundColor: assignedExecutive && assignedExecutive.id === item.id ? 'red' : 'green',
               },
             ]}
             onPress={() => handleExecutivePress(item)}
           >
             <Text style={styles.assignButtonText}>
               {assignedExecutive && assignedExecutive.id === item.id ? 'Unassign' : 'Assign'}
             </Text>
           </TouchableOpacity>
           <TouchableOpacity
             style={styles.deleteButton}
             onPress={() => handleExecutiveDelete(item)}
           >
             <Text style={styles.deleteButtonText}>Delete</Text>
           </TouchableOpacity>
         </View>
       )}
       keyExtractor={(item) => item.name}
     />

      <Text style={styles.productDetailsHeader}>Product Details</Text>
      <View style={styles.productDetails}>
        <Text style={styles.label}>Product Name:</Text>
        <RNPickerSelect
          items={productCategories}
          onValueChange={(value) => setProductName(value)}
          style={pickerSelectStyles}
        />
        <Text style={styles.label}>Product Weight:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter product weight (up to 15 kg)"
          keyboardType="numeric"
          value={productWeight}
          onChangeText={(text) => setProductWeight(text)}
          onBlur={checkWeightLimit}
        />
        <Text style={styles.limitText}>Limit up to 15 kg</Text>
      </View>

      <Text style={styles.receiverLocationHeader}>Receiver's Location Details</Text>
      <View style={styles.receiverLocationDetails}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Receiver's Name"
          value={receiverName}
          onChangeText={(text) => setReceiverName(text)}
        />

        <Text style={styles.label}>Contact:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Receiver's Contact"
          value={receiverContact}
          onChangeText={(text) => setReceiverContact(text)}
        />

        <Text style={styles.label}>Location:</Text>
        <View style={styles.receiverMapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825, // Replace with the initial latitude
              longitude: -122.4324, // Replace with the initial longitude
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: 37.78825, // Replace with the actual latitude
                longitude: -122.4324, // Replace with the actual longitude
              }}
              title="Receiver's Location"
            />
          </MapView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  userDetails: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
  },
  nearbyExecutivesHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  executivesContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
  },
  executiveItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  executiveName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  executiveTime: {
    fontSize: 16,
  },
  productDetailsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productDetails: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  pickerInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 16,
  },
  receiverLocationHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  receiverLocationDetails: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  receiverMapContainer: {
    marginTop: 16,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
  limitText: {
    fontSize: 16,
    color: 'gray',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default OrderNow;
