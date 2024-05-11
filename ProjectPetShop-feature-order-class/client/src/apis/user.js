import axios from "../axios";

export const apiRegister = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/user/register",
        method: "post",
        data,
        withCredentials: true

        //params: {id: id} chuyền tham số
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiLogin = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/user/login",
        method: "post",
        data
        //params: {id: id} chuyền tham số
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiForgotPassword = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/user/forgotpassword",
        method: "post",
        data
        //params: {id: id} chuyền tham số
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiResetPassword = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/user/resetpassword",
        method: "put",
        data
        //params: {id: id} chuyền tham số
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiGetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/user/current",
        method: "get",
        //params: {id: id} chuyền tham số
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiRatings = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/product/ratings",
        method: "put",
        data
        //params: {id: id} chuyền tham số
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiGetUsers = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/user/",
        method: "get",
        params
        //params: {id: id} chuyền tham số
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiUpdateUser = (data, uid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/user/" +uid,
        method: "put",
        data
        //params: {id: id} chuyền tham số
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  // export const apiDeleteUser = (uid) =>
  // new Promise(async (resolve, reject) => {
  //   try {
  //     const response = await axios({
  //       url: "/user/" +uid,
  //       method: "delete",
  //       //params: {id: id} chuyền tham số
  //     });
  //     resolve(response);
  //   } catch (error) {
  //     reject(error);
  //   }
  // });

  export const apiDeleteUser = (uid) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios({
          url: `/user/${uid}`, // Sử dụng phương thức DELETE thay vì PUT
          method: "delete",
          data: { isDeleted: true }, // Truyền dữ liệu cần cập nhật
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  

  export const apiUpdateCurrent = (data) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios({
          url: "/user/current",
          method: "put",
          data
          //params: {id: id} chuyền tham số
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });

    export const apiUpdateCart = (data) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await axios({
            url: "/user/cart",
            method: "put",
            data
            //params: {id: id} chuyền tham số
          });
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
  
      export const apiRemoveCart = (pid) =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await axios({
              url: "/user/remove-cart/" + pid,
              method: "delete",
              //params: {id: id} chuyền tham số
            });
            resolve(response);
          } catch (error) {
            reject(error);
          }
        });  