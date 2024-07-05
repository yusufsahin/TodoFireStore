import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import store from './src/store/store';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './src/store/todosActions';

const TodoApp = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.items);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      status: ''
    }
  });

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const onSubmit = data => {
    dispatch(addTodo(data));
    reset();
  };

  const handleUpdateTodo = (id) => {
    const updatedData = {
      name: "Updated Name", // Change as per actual update logic
      description: "Updated Description",
      status: "Updated Status"
    };
    dispatch(updateTodo(id, updatedData));
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Status"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <Text style={styles.todoText}>{item.name}</Text>
            <Text style={styles.todoText}>{item.description}</Text>
            <Text style={styles.todoText}>{item.status}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleUpdateTodo(item.id)}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleDeleteTodo(item.id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const App = () => (
  <Provider store={store}>
    <TodoApp />
  </Provider>
);

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
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  todoText: {
    fontSize: 16,
    flex: 1,
  },
});

export default App;
