import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * TaskListScreen component displays a list of tasks.
 * @param {object} navigation - Navigation prop for navigating between screens.
 * @returns {JSX.Element} TaskListScreen UI
 */
export default function TaskListScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Fetches tasks from the server.
   */
  const fetchTasks = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const response = await axios.get(`http://localhost:5001/api/tasks/gettasks/${username}`);
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching tasks');
      setLoading(false);
    }
  };

  /**
   * Renders an individual task item.
   * @param {object} item - Task item
   * @returns {JSX.Element} Task item UI
   */
  const renderTask = ({ item }) => (
    <TouchableOpacity style={styles.taskItem} onPress={() => navigation.navigate('TaskDetail', { task: item })}>
      <Text style={styles.taskText}>{item.title}</Text>
    </TouchableOpacity>
  );

  /**
   * Renders the UI when the task list is empty.
   * @returns {JSX.Element} Empty list UI
   */
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No tasks found</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('TaskForm')}
      >
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        renderEmptyList()
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('TaskForm')}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

// Styles for the TaskListScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  list: {
    padding: 16,
  },
  taskItem: {
    backgroundColor: '#3e3e3e',
    padding: 16,
    borderRadius: 5,
    marginBottom: 10,
  },
  taskText: {
    color: '#fff',
    fontSize: 18,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6200ee',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
  },
  addButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
