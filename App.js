import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const toggleTaskCompletion = (key) => {
    setTasks(tasks.map(task =>
      task.key === key ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim() === '') {
      return;
    }
    const newKey = String(Math.max(...tasks.map(t => parseInt(t.key)), 0) + 1);
    setTasks([...tasks, { key: newKey, description: newTask, completed: false }]);
    setNewTask('');
  };

  const removeTask = (key) => {
    setTasks(tasks.filter(task => task.key !== key));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxChecked]}
        onPress={() => toggleTaskCompletion(item.key)}
      >
        {item.completed ? (
          <View style={styles.innerCheckbox} />
        ) : null}
      </TouchableOpacity>
      <Text
        style={[
          styles.taskText,
          item.completed && {
            textDecorationLine: 'line-through',
            textDecorationStyle: 'solid',
            color: '#888',
          },
        ]}
      >
        {item.description}
      </Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeTask(item.key)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  // FooterInput removed; input bar will be rendered outside FlatList
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>To-Do</Text>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        style={styles.list}
        contentContainerStyle={tasks.length === 0 && { flex: 1, justifyContent: 'center', alignItems: 'center' }}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet. Add your first task below!</Text>}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a new task..."
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
          returnKeyType="done"
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // footerWrapper removed
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingVertical: 18,
    backgroundColor: '#232634',
    borderTopWidth: 1,
    borderTopColor: '#232634',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
    alignSelf: 'stretch',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#181a20',
    padding: 0,
    margin: 0,
  },
  header: {
    padding: 24,
    backgroundColor: '#232634',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#232634',
    marginBottom: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  list: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    margin: 0,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#232634',
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4f8cff',
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181a20',
  },
  checkboxChecked: {
    backgroundColor: '#4f8cff',
    borderColor: '#4f8cff',
  },
  innerCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  taskText: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: '#232634',
    borderTopWidth: 1,
    borderTopColor: '#232634',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4f8cff',
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#181a20',
    alignSelf: 'stretch',
    width: '100%',
  },
  addButton: {
    backgroundColor: '#4f8cff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  removeButton: {
    marginLeft: 12,
    backgroundColor: '#ff4f4f',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  emptyText: {
    color: '#aaa',
    fontSize: 18,
    marginTop: 40,
    textAlign: 'center',
  },
});
