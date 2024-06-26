import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import TaskListScreen from './screens/TaskListScreen';
import TaskFormScreen from './screens/TaskFormScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';
import TaskDetailsScreen from './screens/TaskDetailsScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';

// Create navigation stacks
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define main tabs navigation
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Tasks" 
        component={TaskListScreen} 
        options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="list" color={color} size={size} />) }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="settings" color={color} size={size} />) }} 
      />
      <Tab.Screen 
        name="About" 
        component={AboutScreen} 
        options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="information-circle" color={color} size={size} />) }} 
      />
    </Tab.Navigator>
  );
}

// Main component representing the entire application
export default function App() {
  return (
    <NavigationContainer>
      {/* Navigator for handling various screens */}
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} // Hide header for splash screen
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Hide header for login screen
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{ headerShown: false }} // Hide header for signup screen
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{ headerShown: false }} // Hide header for main tabs
        />
        <Stack.Screen name="TaskForm" component={TaskFormScreen} />
        <Stack.Screen name="TaskDetail" component={TaskDetailsScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
