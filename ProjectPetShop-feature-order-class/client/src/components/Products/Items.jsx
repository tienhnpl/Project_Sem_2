import React, { memo, useEffect, useState } from "react";
import Card from "./Card";
import {getProducts} from '../../apis/products'
import {renderStarFromNumber} from '../../utils/helpers'
import { Link, useNavigate } from "react-router-dom";


const Items = ({productData}) => {
  const [bestSellers, setBestSellers] = useState(null)
  const [newProduct, setNewProduct] = useState(null)
  const navigate = useNavigate()
  const fetchProducts = async () => {
    const response = await Promise.all([getProducts({sort: '-sold'}), getProducts({sort: '-createdAt'})])
    if (response[0]?.success) setBestSellers(response[0].products)
    if (response[1]?.success) setNewProduct(response[1].products)
  }

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(actions.getProducts());
  // }, []);
  // const { products } = useSelector((state) => state.app);


  // Render your component with products data

  

  useEffect(() => {
    fetchProducts()
  },[])

  return (
    <div>
      <div
        className="px-12"
        // to={`/${path.DETAIL_PRODUCT}/${bestSellers[0]?.id}/${bestSellers[0]?.title}`}
      >
        <div className="flex justify-between items-center mb-[50px]">
          <p className="text-[#2E2437] font-bold text-[40px]">
            Sản phẩm bán chạy
          </p>
          <span className="font-semibold text-[20px] text-[#000000]">
            Xem tất cả
          </span>
        </div>
      </div>
  
      <div className="grid grid-cols-4 gap-x-10 gap-y-[50px]">
      {bestSellers && bestSellers.map(el => (
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
      <div className="px-12">
      <div className="flex justify-between items-center mb-[50px] mt-12">
          <p className="text-[#2E2437] font-bold text-[40px]">
            Sản phẩm mới
          </p>
          <span className="font-semibold text-[20px] text-[#000000]">
            Xem tất cả
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-10 gap-y-[50px]">
      {newProduct && newProduct?.map(el => (
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
      
    </div>

    
  );
  
};

export default memo(Items);
