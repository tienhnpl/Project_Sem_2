import actionTypes from "../actions/actionTypes";
// import { GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE } from '../actions/actionTypes';


const initialState = {
  products: [],
  // categories: null,
  // loading: false,
  // error: null,
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      return {
        ...state,
        products: action.productData,
      // };
      // case GET_CATEGORIES_REQUEST:
      //   return {
      //     ...state,
      //     loading: true,
      //     error: null,
      //   };
      // case GET_CATEGORIES_SUCCESS:
      //   return {
      //     ...state,
      //     categories: action.payload,
      //     loading: false,
      //     error: null,
      //   };
      // case GET_CATEGORIES_FAILURE:
      //   return {
      //     ...state,
      //     loading: false,
      //     error: action.payload,
        };
     
    default:
      return state;
  }
   
};



export default appReducer;
