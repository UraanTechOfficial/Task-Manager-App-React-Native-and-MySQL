import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

/**
 * SettingsScreen component provides options for changing password and logging out.
 * @returns {JSX.Element} SettingsScreen UI
 */
export default function SettingsScreen() {
  const navigation = useNavigation();

  /**
   * Function to handle logout process.
   */
  const handleLogout = async () => {
    try {
      // Remove username from AsyncStorage
      await AsyncStorage.removeItem('username');
      // Reset navigation stack to login screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  /**
   * Function to navigate to change password screen.
   */
  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      {/* Button to navigate to change password screen */}
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      {/* Button to trigger logout function */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the SettingsScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25292e', // Dark background color
  },
  text: {
    color: '#fff', // White color for text
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee', // Purple color for button
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%', // 80% width of the container
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White color for button text
    fontSize: 18,
  },
});
