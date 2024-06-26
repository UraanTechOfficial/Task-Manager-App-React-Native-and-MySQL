import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

/**
 * TaskDetailScreen displays the details of a specific task, allowing the user to update or delete it.
 * @param {object} route - Route prop containing the task details.
 * @param {object} navigation - Navigation prop for navigating between screens.
 * @returns {JSX.Element} TaskDetailScreen UI
 */
export default function TaskDetailScreen({ route, navigation }) {
  // Destructure task from route params
  const { task } = route.params;

  // State hooks for task details and UI states
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(new Date(task.due_date));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Function to handle task update
   */
  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Format the date to YYYY-MM-DD to avoid timezone issues
      const formattedDate = dueDate.toLocaleDateString('en-CA');

      // API request to update the task
      await axios.put(`http://localhost:5001/api/tasks/updatetask/${task.id}`, {
        title,
        description,
        due_date: formattedDate,
        status,
      });
      // Navigate back to the main screen after successful update
      navigation.replace('Main');
    } catch (err) {
      setError('Error updating task');
      setLoading(false);
    }
  };

  /**
   * Function to handle task deletion
   */
  const handleDelete = async () => {
    setLoading(true);
    try {
      // API request to delete the task
      await axios.delete(`http://localhost:5001/api/tasks/deletetask/${task.id}`);
      // Navigate back to the main screen after successful deletion
      navigation.replace('Main');
    } catch (err) {
      setError('Error deleting task');
      setLoading(false);
    }
  };

  /**
   * Function to handle date change from the date picker
   * @param {Event} event - The event object
   * @param {Date} selectedDate - The selected date from the picker
   */
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={'#888'}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={'#888'}
      />
      <Text style={styles.label}>Status</Text>
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
      <Text style={styles.label}>Due Date</Text>
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
      {error && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <View>
          <Button title="Update Task" onPress={handleUpdate} />
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Task</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Styles for the TaskDetailScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#25292e',
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    backgroundColor: '#25292e',
  },
  pickerContainer: {
    width: '100%',
    padding: 2,
    backgroundColor: '#25292e',
  },
  picker: {
    width: '100%',
    color: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  deleteButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
