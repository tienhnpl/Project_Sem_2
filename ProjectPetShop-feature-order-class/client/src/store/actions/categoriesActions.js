// actions.js

export const GET_CATEGORIES_REQUEST = 'app/categories/request';
export const GET_CATEGORIES_SUCCESS = 'app/categories/success';
export const GET_CATEGORIES_FAILURE = 'app/categories/failure';

export const getCategoriesRequest = () => ({
  type: GET_CATEGORIES_REQUEST,
});

export const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categories,
});

export const getCategoriesFailure = (error) => ({
  type: GET_CATEGORIES_FAILURE,
  payload: error,
});
