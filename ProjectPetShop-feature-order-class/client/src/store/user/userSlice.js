import * as actions from './asyncAction';
import { GET_CURRENT_FULFILLED, GET_CURRENT_PENDING, GET_CURRENT_REJECTED } from '../actions/actionTypes';

// ActionTypes
const REGISTER = 'user/register';
const LOGOUT = "user/logout";
const CLEAR_MESSAGE = 'user/clearMessage';
// Initial state
const initialState = {
  isLoggedIn: false,
  current: null,
  token: null,
  isLoading: false,
  mes: ''
};

// Action creators
export const register = (userData, token) => ({
  type: REGISTER,
  payload: { isLoggedIn: true, current: userData, token },
});


export const logout = () => ({
  type: LOGOUT,
});

// Action creator
export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        current: action.payload.current,
        token: action.payload.current.token,
      };
    case GET_CURRENT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CURRENT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        current: action.payload,
        isLoggedIn: true
      };
    case GET_CURRENT_REJECTED:
      return {
        ...state,
        isLoading: false,
        current: null,
        error: action.payload,
        isLoggedIn: false,
        token:null,
        mes: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại'
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        current: null,
        token: null,
      }; 
    case CLEAR_MESSAGE:
      return {
        ...state,
        mes: '',
        }; 
    
    default:
      return state;
  }
};

export default userReducer;
