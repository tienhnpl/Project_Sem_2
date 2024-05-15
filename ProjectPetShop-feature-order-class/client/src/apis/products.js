import axios from "../axios";

export const getProducts = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/product",
        method: "get",
        params
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiGetProduct = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/product/"+ pid,
        method: "get",
        //params: {id: id} chuyền tham số
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiCreateProduct = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/product/",
        method: "post",
        data
        //params: {id: id} chuyền tham số
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiUpdateProduct = (data, pid) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios({
          url: "/product/"+ pid,
          method: "put",
          data
          //params: {id: id} chuyền tham số
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });

    export const apiDeleteProduct = (pid) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await axios({
            url: "/product/"+ pid,
            method: "delete",
           
            //params: {id: id} chuyền tham số
          });
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });

      export const apiCreateOrder = (data) =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await axios({
              url: "/order/",
              method: "post",
              data
             
              //params: {id: id} chuyền tham số
            });
            resolve(response);
          } catch (error) {
            reject(error);
          }
        });
      
        export const apiGetOrders = (params) =>
          new Promise(async (resolve, reject) => {
            try {
              const response = await axios({
                url: "/order/admin",
                method: "get",
                params
               
                //params: {id: id} chuyền tham số
              });
              resolve(response);
            } catch (error) {
              reject(error);
            }
          });

          export const apiGetUserOrders = (params) =>
            new Promise(async (resolve, reject) => {
              try {
                const response = await axios({
                  url: "/order/",
                  method: "get",
                  params
                 
                  //params: {id: id} chuyền tham số
                });
                resolve(response);
              } catch (error) {
                reject(error);
              }
            });  