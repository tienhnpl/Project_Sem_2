import * as actions from './asyncAction';
import { GET_CURRENT_FULFILLED, GET_CURRENT_PENDING, GET_CURRENT_REJECTED,UPDATE_CART } from '../actions/actionTypes';

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
  mes: '',
  currentCart: []
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

export const updateCart = (pid, quantity) => ({
  type: UPDATE_CART,
  payload: { pid, quantity },
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
        isLoggedIn: true,
        currentCart : action.payload.cart
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
        case UPDATE_CART:
        const { pid, quantity } = action.payload;
        const updateItemIndex = state.currentCart.findIndex(el => el.product?._id === pid);
        if (updateItemIndex !== -1) {
        const updatedCart = [...state.currentCart]; // Tạo bản sao của currentCart
        updatedCart[updateItemIndex].quantity = quantity;
return {
  ...state,
  currentCart: updatedCart,
  mes: '', // Reset message
};
  } else {
    return {
      ...state,
      mes: 'Hãy thử lại sau',
    };
  }     
    
    default:
      return state;
  }
};

// state.currentCart = action.payload
export default userReducer;
