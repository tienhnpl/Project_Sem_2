const path = {
  HOME: "",
  PUBLIC: "/",
  LOGIN: "login",
  DOG: "dog",
  CAT: "cat",
  PROMOTION: "promotion",
  PRODUCTS: ":category",
  STAR: "*",
  BLOGS: 'blog',
  DETAIL_PRODUCT__CATEGORY__PID__TITLLE: ':category/:subcategories/:pid/:title',
  FINAL_REGISTER: 'finalregister/:status',
  RESET_PASSWORD: 'reset-password/:token',
  DETAIL_CART: 'my-cart',
  CHECKOUT: 'checkout',

  //Admin
  ADMIN: 'admin',
  DASHBOARD: 'dashboard',
  MANAGE_USER: 'manage-user',
  MANAGE_PRODUCTS: 'manage-products',
  MANAGE_ORDER: 'manage-order',
  CREATE_PRODUCTS: 'create-products',

  //Member
  MEMBER: 'member',
  PERSONAL: 'personal',
  MY_CART: 'my-cart',
  HISTORY: 'buy-history'
}; 

module.exports = path;
