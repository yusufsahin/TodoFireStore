import firestore from '@react-native-firebase/firestore';

// Action Types
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';

export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

// Action Creators
export const fetchTodos = () => {
  return async dispatch => {
    dispatch({ type: FETCH_TODOS_REQUEST });
    try {
      const querySnapshot = await firestore()
        .collection('ToDoCollection')
        .get();
      const todos = [];
      querySnapshot.forEach(documentSnapshot => {
        todos.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
      });
      dispatch({ type: FETCH_TODOS_SUCCESS, payload: todos });
    } catch (error) {
      dispatch({ type: FETCH_TODOS_FAILURE, payload: error.message });
    }
  };
};

export const addTodo = (todo) => {
  return async dispatch => {
    dispatch({ type: ADD_TODO_REQUEST });
    try {
      const docRef = await firestore().collection('ToDoCollection').add(todo);
      dispatch({ type: ADD_TODO_SUCCESS, payload: { ...todo, id: docRef.id } });
    } catch (error) {
      dispatch({ type: ADD_TODO_FAILURE, payload: error.message });
    }
  };
};

export const updateTodo = (id, todo) => {
  return async dispatch => {
    dispatch({ type: UPDATE_TODO_REQUEST });
    try {
      await firestore().collection('ToDoCollection').doc(id).update(todo);
      dispatch({ type: UPDATE_TODO_SUCCESS, payload: { id, todo } });
    } catch (error) {
      dispatch({ type: UPDATE_TODO_FAILURE, payload: error.message });
    }
  };
};

export const deleteTodo = (id) => {
  return async dispatch => {
    dispatch({ type: DELETE_TODO_REQUEST });
    try {
      await firestore().collection('ToDoCollection').doc(id).delete();
      dispatch({ type: DELETE_TODO_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_TODO_FAILURE, payload: error.message });
    }
  };
};
