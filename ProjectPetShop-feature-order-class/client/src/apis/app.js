import axios from "../axios";

export const apiGetCategories = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/productcategory",
        method: "get",
        //params: {id: id} chuyền tham số
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });