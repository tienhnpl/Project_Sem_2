import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const getNews = () => async (dispatch) => {
  try {
    const response = await apis.getNews();
    if (response?.status === 200) {
      dispatch({
        type: actionTypes.GET_NEWS,
        newData: response.data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_NEWS,
        newData: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_NEWS,
      newData: null,
    });
  }
};
