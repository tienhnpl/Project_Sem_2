import actionTypes from "../actions/actionTypes";

const initialState = {
  news: [],
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NEWS:
      return {
        ...state,
        news: action.newData,
      };

    default:
      return state;
  }
};

export default appReducer;
