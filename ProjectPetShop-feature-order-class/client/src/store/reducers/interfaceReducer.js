import actionTypes from "../actions/actionTypes";

const initialState = {
  footerHight: 0,
};
const getFooterHight = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FOOTER_HIGHT:
      return {
        ...state,
        footerHight: action.value,
      };

    default:
      return state;
  }
};

export default getFooterHight;
