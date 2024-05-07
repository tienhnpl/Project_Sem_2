import { getCategoriesSuccess, getCategoriesFailure,getCategoriesRequest } from './categoriesActions'; // hoặc import { getCategoriesSuccess, getCategoriesFailure } from '../actions/categoriesActions';
import * as apis from '../../apis/index';

export const getCategories = () => async (dispatch) => {
  dispatch(getCategoriesRequest());
  try {
    const response = await apis.apiGetCategories();
    if (response.success) {
      dispatch(getCategoriesSuccess(response.productCategories));
    } else {
      throw new Error(response);
    }
  } catch (error) {
    dispatch(getCategoriesFailure(error));
  }
};
