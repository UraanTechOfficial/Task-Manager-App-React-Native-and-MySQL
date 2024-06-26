import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

/**
 * SplashScreen component displays a splash screen while the app is loading.
 * @param {object} navigation - Navigation prop for navigating between screens.
 * @returns {JSX.Element} SplashScreen UI
 */
export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Navigate to Login screen after 2 seconds
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Application logo */}
      <Image source={require('../assets/icon.png')} style={styles.logo} />
      {/* Loading indicator */}
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

// Styles for the SplashScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25292e', // Dark background color
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    color: '#fff', // White color for text
    marginTop: 20,
  },
});
