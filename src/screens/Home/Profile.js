import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';


const ProfilePage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [markerCoordinates, setMarkerCoordinates] = useState(null);

  // Function to handle form submission
  const handleFormSubmit = () => {
    // Basic form validation
    if (!name || !address || !contact || !email || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return;
    }

    // Handle form submission logic here
    // You can add API calls or other actions as needed

    // For demonstration purposes, we'll just log the form data
    console.log({
      name,
      address,
      contact,
      email,
      password,
      markerCoordinates,
    });

    // Optionally, you can reset the form fields after submission
    clearFormFields();
  };

  // Function to clear form fields
  const clearFormFields = () => {
    setName('');
    setAddress('');
    setContact('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMarkerCoordinates(null);
  };

  // Function to handle map marker press
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinates(coordinate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input
        placeholder="Name"
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder="Address"
        label="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <Input
        placeholder="Contact"
        label="Contact"
        value={contact}
        onChangeText={(text) => setContact(text)}
        keyboardType="phone-pad"
      />
      <Input
        placeholder="Email"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <Input
        placeholder="Create Password"
        label="Create Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Input
        placeholder="Confirm Password"
        label="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {markerCoordinates && (
          <Marker coordinate={markerCoordinates} title="Selected Location" />
        )}
      </MapView>
      <Button title="Save" onPress={handleFormSubmit} />
      <Text style={styles.signInText}>
        If you have already created an account,{' '}
        <Text
          style={{ color: 'blue', textDecorationLine: 'underline' }}
          onPress={() => navigation.navigate('SignIn')}
        >
          SignIn
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  map: {
    height: 200,
    marginTop: 16,
  },
  signInText: {
    marginTop: 16,
    textAlign: 'center',
  },
});

export default ProfilePage;
