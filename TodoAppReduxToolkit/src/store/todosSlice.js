import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const querySnapshot = await firestore().collection('ToDoCollection').get();
  const todos = [];
  querySnapshot.forEach(documentSnapshot => {
    todos.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
  });
  return todos;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const docRef = await firestore().collection('ToDoCollection').add(todo);
  return { ...todo, id: docRef.id };
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, todo }) => {
  await firestore().collection('ToDoCollection').doc(id).update(todo);
  return { id, todo };
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await firestore().collection('ToDoCollection').doc(id).delete();
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add Todo
      .addCase(addTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update Todo
      .addCase(updateTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, todo } = action.payload;
        const existingTodo = state.items.find(item => item.id === id);
        if (existingTodo) {
          existingTodo.name = todo.name;
          existingTodo.description = todo.description;
          existingTodo.status = todo.status;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Delete Todo
      .addCase(deleteTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default todosSlice.reducer;
