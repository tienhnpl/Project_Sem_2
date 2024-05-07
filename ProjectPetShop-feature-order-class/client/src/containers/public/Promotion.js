import React, { useEffect } from "react";
import product_heading from "../../assets/imgs/product_heading.png";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Card, CategoryInProductPage } from "../../components";

const Promotion = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getProducts());
  }, []);

  const { products } = useSelector((state) => state.app);

  return (
    <div className="">
      <img src={product_heading} className="w-full" alt="Product heading" />
      <div className="mx-[100px] my-[50px] ">
        <p className="text-[40px] font-extrabold mb-[46px]">
          Sản phẩm khuyến mãi
        </p>
        <div className="flex justify-between">
          <div>
            <CategoryInProductPage />
          </div>

          <div className="grid grid-cols-3 gap-x-[20px] gap-y-[30px]">
            {products &&
              products.slice(0, 8).map((item) => (
                <Card
                  key={item?._id}
                  image={item?.image}
                  name={item?.name}
                  bought={item?.bought}
                  price={item?.price}
                  discount={item?.discount}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
