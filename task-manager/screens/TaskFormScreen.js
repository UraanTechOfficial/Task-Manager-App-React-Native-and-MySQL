import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * TaskFormScreen component allows users to create or update tasks.
 * @param {object} route - Route prop containing the task ID if editing an existing task.
 * @param {object} navigation - Navigation prop for navigating between screens.
 * @returns {JSX.Element} TaskFormScreen UI
 */
export default function TaskFormScreen({ route, navigation }) {
  const { taskId } = route.params || {};
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  /**
   * Fetches task details if in edit mode.
   */
  const fetchTask = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5001/api/tasks/${taskId}`);
      const task = response.data;
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(new Date(task.due_date));
      setStatus(task.status);
      setLoading(false);
    } catch (err) {
      setError('Error fetching task');
      setLoading(false);
    }
  };

  /**
   * Handles saving or updating the task.
   */
  const handleSave = async () => {
    setLoading(true);
    try {
      const username = await AsyncStorage.getItem('username');
      const formattedDate = dueDate.toLocaleDateString('en-CA'); // Formats date as YYYY-MM-DD

      await axios.put(`http://localhost:5001/api/tasks/savetasks/${username}`, {
        title,
        description,
        due_date: formattedDate, 
        status
      });
      navigation.replace('Main');
    } catch (err) {
      setError('Error saving task');
      setLoading(false);
    }
  };

  /**
   * Handles date change in the date picker.
   * @param {object} event - Event object
   * @param {Date} selectedDate - Selected date
   */
  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setShowDatePicker(false);
      setDueDate(selectedDate);
    } else {
      setShowDatePicker(false); // Hide the date picker if canceled
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Title'
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={'#888'}
      />
      <TextInput
        placeholder='Description'
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={'#888'}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          style={styles.picker}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          <Picker.Item label="Pending" value="pending" />
          <Picker.Item label="Completed" value="completed" />
        </Picker>
      </View>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.input}>{dueDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

// Styles for the TaskFormScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25292e',
    padding: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    color: '#fff',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#25292e',
  },
  picker: {
    width: '100%',
    color: '#fff',
  },
  error: {
    color: 'red',
  },
});
