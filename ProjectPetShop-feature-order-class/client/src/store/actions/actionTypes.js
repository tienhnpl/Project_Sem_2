const actionTypes = {
  GET_PRODUCTS: "GET_PRODUCTS",
  GET_NEWS: "GET_NEWS",
  GET_FOOTER_HIGHT: "GET_FOOTER_HIGHT",
  SHOW_CART : "SHOW_CART"
  // LOGOUT: "user/logout", // Thêm hằng số mới cho logout
};
export const GET_CURRENT_PENDING = "user/getCurrent/pending";
export const GET_CURRENT_FULFILLED = "user/getCurrent/fulfilled";
export const GET_CURRENT_REJECTED = "user/getCurrent/rejected";
export const SHOW_MODAL = "SHOW_MODAL";
// export const SHOW_CART = "SHOW_CART";
export const GET_CATEGORIES_REQUEST = 'app/categories/request';
export const GET_CATEGORIES_SUCCESS = 'app/categories/success';
export const GET_CATEGORIES_FAILURE = 'app/categories/failure';
export const UPDATE_CART = 'user/updateCart';

export default actionTypes;
