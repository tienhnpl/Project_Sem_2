import actionTypes from "../actions/actionTypes";

const initialState = {
  curData: null,
};
const testPersistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TESTPERSIST":
      return {
        ...state,
        curData: action.value,
      };
    default:
      return state;
  }
};

export default testPersistReducer;
