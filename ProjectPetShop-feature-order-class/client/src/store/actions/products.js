import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const [bestSellersResponse, newProductsResponse] = await Promise.all([
        apis.getProducts({ sort: "-sold" }),
        apis.getProducts({ sort: "-createdAt" }),
      ]); 

      if (bestSellersResponse[0]?.success) {
        dispatch({
          type: actionTypes.UPDATE_BEST_SELLERS,
          bestSellers: bestSellersResponse[0].products,
        });
      } else {
        dispatch({
          type: actionTypes.UPDATE_BEST_SELLERS,
          bestSellers: null,
        });
      }

      if (newProductsResponse[0]?.success) {
        dispatch({
          type: actionTypes.UPDATE_NEW_PRODUCTS,
          newProducts: newProductsResponse[0].products,
        });
      } else {
        dispatch({
          type: actionTypes.UPDATE_NEW_PRODUCTS,
          newProducts: null,
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }; 
}; 


// export const getProducts = () => async (dispatch) => {
//   try {
//     const response = await apis.getProducts();
//     if (response?.status === 200) {
//       dispatch({
//         type: actionTypes.GET_PRODUCTS,
//         productData: response.data,
//       });
//     } else {
//       dispatch({
//         type: actionTypes.GET_PRODUCTS,
//         productData: null,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: actionTypes.GET_PRODUCTS,
//       productData: null,
//     });
//   }
// };
