import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

/**
 * ChangePasswordScreen component allows users to change their password.
 * @param {object} navigation - Navigation prop for navigating between screens.
 * @returns {JSX.Element} ChangePasswordScreen UI
 */
export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Function to handle password change process.
   */
  const handleChangePassword = async () => {
    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    // Set loading state to true
    setLoading(true);

    try {
      // Retrieve username from AsyncStorage
      const username = await AsyncStorage.getItem('username');
      // Send request to change password endpoint
      const response = await axios.put(`http://localhost:5001/api/auth/changePassword`, {
        username,
        currentPassword,
        newPassword,
      });

      // Check response status and provide appropriate feedback
      if (response.status === 200) {
        Alert.alert('Success', 'Password changed successfully');
        navigation.replace('Main'); // Navigate to main screen after successful password change
      } else {
        Alert.alert('Error', 'Failed to change password');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to change password');
    }

    // Set loading state back to false after password change process completes
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Text style={styles.label}>Confirm New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {/* Display activity indicator while loading, otherwise display button to change password */}
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <Button title="Change Password" onPress={handleChangePassword} />
      )}
    </View>
  );
}

// Styles for the ChangePasswordScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#25292e', // Dark background color
  },
  label: {
    color: '#fff', // White color for text
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff', // White background color for input
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
});
