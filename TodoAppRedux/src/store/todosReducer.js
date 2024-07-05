/*
import {
    FETCH_TODOS_REQUEST,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE,
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    UPDATE_TODO_REQUEST,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAILURE,
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
  } from './todosActions';
  
  const initialState = {
    items: [],
    status: 'idle',
    error: null,
  };
  
  const todosReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TODOS_REQUEST:
      case ADD_TODO_REQUEST:
      case UPDATE_TODO_REQUEST:
      case DELETE_TODO_REQUEST:
        return {
          ...state,
          status: 'loading',
        };
      case FETCH_TODOS_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          items: action.payload,
        };
      case FETCH_TODOS_FAILURE:
      case ADD_TODO_FAILURE:
      case UPDATE_TODO_FAILURE:
      case DELETE_TODO_FAILURE:
        return {
          ...state,
          status: 'failed',
          error: action.payload,
        };
      case ADD_TODO_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          items: [...state.items, action.payload],
        };
      case UPDATE_TODO_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          items: state.items.map(todo =>
            todo.id === action.payload.id
              ? { ...todo, ...action.payload.todo }
              : todo
          ),
        };
      case DELETE_TODO_SUCCESS:
        return {
          ...state,
          status: 'succeeded',
          items: state.items.filter(todo => todo.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default todosReducer;
  */


import {
    FETCH_TODOS_REQUEST,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE,
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    UPDATE_TODO_REQUEST,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAILURE,
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
} from './todosActions';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return {...state, status: 'loading'};
    case FETCH_TODOS_SUCCESS:
      return {...state, status: 'succeeded', items: action.payload};
    case FETCH_TODOS_FAILURE:
      return {...state, status: 'failed', error: action.payload};
    case ADD_TODO_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        items: [...state.items, action.payload],
      };
    case ADD_TODO_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };
    case UPDATE_TODO_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        items: state.items.map(todo =>
          todo.id === action.payload.id
            ? {...todo, ...action.payload.todo}
            : todo,
        ),
      };
    case UPDATE_TODO_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };
    case DELETE_TODO_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        items: state.items.filter(todo => todo.id !== action.payload),
      };
    case DELETE_TODO_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };
    default:
      return state;
  }
};
export default todosReducer;