import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('ToDoCollection')
      .onSnapshot(querySnapshot => {
        const todos = [];
        querySnapshot.forEach(documentSnapshot => {
          todos.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setTodos(todos)
      });
      return ()=>unsubscribe();
  },[]);

  const addTodo = () => {
    if (name.length > 0) {
      firestore()
        .collection('ToDoCollection')
        .add({name, description, status})
        .then(() => {
          setName(''), setDescription('');
          setStatus('');
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />
      <Button title="Add Todo" onPress={addTodo} />
      <FlatList
        data={todos}
        renderItem={({item}) => (
          <View style={styles.todoContainer}>
            <Text style={styles.todoText}>{item.name}</Text>
            <Text style={styles.todoText}>{item.description}</Text>
            <Text style={styles.todoText}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoText: {
    fontSize: 16,
  },
});
export default App;
