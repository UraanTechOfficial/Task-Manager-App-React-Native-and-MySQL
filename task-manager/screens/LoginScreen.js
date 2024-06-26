import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * LoginScreen component allows users to log in to the application.
 * @param {object} navigation - Navigation prop for navigating between screens.
 * @returns {JSX.Element} LoginScreen UI
 */
export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /**
   * Function to handle user login.
   */
  const handleLogin = async () => {
    try {
      // Send login request to the server
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        username,
        password,
      });
      // Save token and username to AsyncStorage upon successful login
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('username', username); // Save username
      navigation.replace('Main'); // Navigate to main screen after successful login
    } catch (err) {
      setError('Invalid credentials'); // Set error message for invalid credentials
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/* Display error message if there's any */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {/* Button to trigger login function */}
      <Button title="Login" onPress={handleLogin} />
      {/* Button to navigate to signup screen */}
      <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}

// Styles for the LoginScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#25292e', // Dark background color
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#fff', // White color for text
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff', // White background color for input
  },
  error: {
    color: 'red', // Red color for error message
  },
});
