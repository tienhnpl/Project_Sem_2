import * as apis from '../../apis/index';
import { GET_CURRENT_FULFILLED, GET_CURRENT_PENDING, GET_CURRENT_REJECTED } from '../actions/actionTypes';


export const getCurrent = () => {
  return async dispatch => {
    dispatch({ type: GET_CURRENT_PENDING });
    try {
      const response = await apis.apiGetCurrent();

      if (!response.success) {
        dispatch({ type: GET_CURRENT_REJECTED, payload: response });
      } else {
        dispatch({ type: GET_CURRENT_FULFILLED, payload: response.rs });
      }
    } catch (error) {
      dispatch({ type: GET_CURRENT_REJECTED, payload: error.message });
    }
  };
};


// // Action creators for getCurrent
// const getCurrentPending = () => ({
//   type: actionTypes.GET_CURRENT_PENDING,
// });

// const getCurrentFulfilled = (data) => ({
//   type: actionTypes.GET_CURRENT_FULFILLED,
//   payload: data,
// });

// const getCurrentRejected = (error) => ({
//   type: actionTypes.GET_CURRENT_REJECTED,
//   payload: error,
// });
