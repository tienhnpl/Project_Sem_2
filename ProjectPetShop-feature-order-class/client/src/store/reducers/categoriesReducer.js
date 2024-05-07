import { GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE } from '../actions/actionTypes';

const initialState = {
  categories: null,
  loading: false,
  error: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      case GET_CATEGORIES_SUCCESS:
        return {
          ...state,
          categories: action.payload,
          loading: false,
          error: null,
        };
      
    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
