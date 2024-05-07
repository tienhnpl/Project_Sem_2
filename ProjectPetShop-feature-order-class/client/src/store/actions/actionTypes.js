const actionTypes = {
  GET_PRODUCTS: "GET_PRODUCTS",
  GET_NEWS: "GET_NEWS",
  GET_FOOTER_HIGHT: "GET_FOOTER_HIGHT",
  // LOGOUT: "user/logout", // Thêm hằng số mới cho logout
};
export const GET_CURRENT_PENDING = "user/getCurrent/pending";
export const GET_CURRENT_FULFILLED = "user/getCurrent/fulfilled";
export const GET_CURRENT_REJECTED = "user/getCurrent/rejected";
export const SHOW_MODAL = "SHOW_MODAL";
export const GET_CATEGORIES_REQUEST = 'app/categories/request';
export const GET_CATEGORIES_SUCCESS = 'app/categories/success';
export const GET_CATEGORIES_FAILURE = 'app/categories/failure';

export default actionTypes;
