import React, { useEffect, useState } from "react";
import product_heading from "../../assets/imgs/product_heading.png";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Card, CategoryInProductPage } from "../../components";
import { getProducts } from "apis";
import { useNavigate } from "react-router-dom";

const Promotion = () => {
  const [discountProducts, setDiscountProducts] = useState([]);
  const navigate = useNavigate()
  const fetchProducts = async () => {
    const response = await Promise.all([
      getProducts({ sort: '-discount' }) // Lấy sản phẩm có discount lớn hơn 0
    ]);
    if (response[0]?.success) setDiscountProducts(response[0].products);
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="">
      <img src={product_heading} className="w-full" alt="Product heading" />
      <div className="mx-[100px] my-[50px] ">
        <p className="text-[40px] font-extrabold mb-[46px]">
          Sản phẩm khuyến mãi
        </p>
        

          <div className="grid grid-cols-3 gap-x-[20px] gap-y-[30px]">
          {discountProducts && discountProducts.map(el => (
  <div 
    key={el.id}
    onClick={(e) => {
      if (el.subcategories && el.subcategories.length > 0) {
        navigate(`/${el?.category?.toLowerCase()}/${el?.subcategories[0]}/${el?._id}/${el?.title}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.error('Subcategories are undefined or empty.');
      }
    }}
    
  >
    <Card
      key={el.id}
      productData={el}
      // image={el.thumb}
      // title={el.title}
      // star={renderStarFromNumber(el.totalRatings)}
      // sold={el.sold}
      // discount={el.discount}
      // price={el.price}
    />
  </div>
))}
          </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Promotion;
