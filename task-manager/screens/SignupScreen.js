import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

/**
 * SignupScreen component allows users to sign up for the application.
 * @param {object} navigation - Navigation prop for navigating between screens.
 * @returns {JSX.Element} SignupScreen UI
 */
export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /**
   * Function to handle user signup.
   */
  const handleSignup = async () => {
    try {
      // Send signup request to the server
      await axios.post('http://localhost:5001/api/auth/signup', {
        username,
        password,
      });
      // Navigate to login screen after successful signup
      navigation.navigate('Login');
    } catch (err) {
      // Handle errors
      if (err.response && err.response.status === 400) {
        setError('Username already exists');
      } else {
        setError('Signup failed');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {/* Input field for username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      {/* Input field for password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Hide password characters
      />
      {/* Display error message if there's any */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {/* Button to trigger signup function */}
      <Button title="Sign Up" onPress={handleSignup} />
      {/* Button to navigate to login screen */}
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

// Styles for the SignupScreen
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
