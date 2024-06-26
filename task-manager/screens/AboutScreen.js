import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * About screen component displaying app information.
 * @returns {JSX.Element} About screen UI
 */
export default function AboutScreen() {
  const appVersion = '1.0.0'; // Replace with your actual app version

  return (
    <View style={styles.container}>
      <Text style={styles.text}>App Version: {appVersion}</Text>
      <Text style={styles.text}>This app helps you manage your tasks efficiently and stay organized.</Text>
      <Text style={styles.text}>Developed by: Task_Manager</Text>
      <Text style={styles.text}>For more information, visit our website or contact us at support@Task_Manager.com.</Text>
    </View>
  );
}

// Styles for the About screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#25292e', // Dark background color
  },
  heading: {
    fontSize: 24,
    color: '#fff', // White color for text
    marginBottom: 16,
  },
  text: {
    color: '#fff', // White color for text
    textAlign: 'center',
    marginBottom: 16,
  },
});
