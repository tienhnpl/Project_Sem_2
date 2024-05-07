import React, {useState, useEffect, memo} from "react";
import { catProducts, cats, dogProducts, dogs } from "../../utils/category";
import path from "../../utils/path";
import { Link } from "react-router-dom";
import { apiGetCategories } from "../../apis/app";
import {createSlug} from '../../utils/helpers'
import DogProduct from "./DogProduct";

const Categories = () => {
  const [categories, setCategories] = useState(null)
  const fetchCategories = async () => {
    const response = await apiGetCategories()
    if (response.success) setCategories(response.productCategories)
      console.log(response.productCategories);

  }
  useEffect(() => {
    fetchCategories()
  }, [])


  return (
    <>
      <div className="absolute z-20 top-[110%] left-[10%] flex p-[35px] rounded-lg bg-white gap-8 before:left-[168px] before:absolute before:border-y-[20px] before:border-x-[20px] before:border-solid before:border-t-transparent before:border-b-white before:border-x-transparent before:top-[-30px]">
        <div className="flex gap-3">
          <div className="w-[172px] flex flex-col">
            <div className="text-[14px] font-bold mb-[15px]"> 
            {categories && categories.find(el => el._id === '662609055f08defa28ecdf71') && (
            <Link
              key={(categories.find(el => el._id === '662609055f08defa28ecdf71').title)}
              to={(categories.find(el => el._id === '662609055f08defa28ecdf71').title)}
            >
            {categories.find(el => el._id === '662609055f08defa28ecdf71').title.toUpperCase()}
            </Link>
                )}
            </div>
            <div className="flex flex-col gap-[10px]">
              {dogProducts.map((product) => (
                <span key={Math.random()} className="text-[14px]">
                  {product}
                </span>
              ))}
            </div>

            <div className="text-[14px] font-bold mt-[15px]"> 
            {categories && categories.find(el => el._id ===  '662609855f08defa28ecdf77') && (
            <Link
              key={(categories.find(el => el._id === '662609855f08defa28ecdf77').title)}
              to={(categories.find(el => el._id === '662609855f08defa28ecdf77').title)}
            >
            {categories.find(el => el._id === '662609855f08defa28ecdf77').title.toUpperCase()}
            </Link>
                )}
            </div>
          </div>

            
          <div className="w-[172px] flex flex-col">
            <div className="text-[14px] font-bold mb-[15px]">
            {categories && categories.find(el => el._id ===  '662608e25f08defa28ecdf6f') && (
            <Link
              key={(categories.find(el => el._id === '662608e25f08defa28ecdf6f').title)}
              to={(categories.find(el => el._id === '662608e25f08defa28ecdf6f').title)}
            >
            {categories.find(el => el._id === '662608e25f08defa28ecdf6f').title.toUpperCase()}
            </Link>
                )}
            </div>
            <div className="flex flex-col gap-[10px]">
              {catProducts.map((product) => (
                <span key={Math.random()} className="text-[14px]">
                  {product}
                </span>
              ))}
            </div>
            <span className="text-[14px] font-bold mt-[15px]">
            {categories && categories.find(el => el._id ===  '662609935f08defa28ecdf79') && (
            <Link
              key={(categories.find(el => el._id === '662609935f08defa28ecdf79').title)}
              to={(categories.find(el => el._id === '662609935f08defa28ecdf79').title)}
            >
            {categories.find(el => el._id === '662609935f08defa28ecdf79').title.toUpperCase()}
            </Link>
                )}
            </span>
          </div>

          <div className="w-[172px] flex flex-col">
            <Link to={`${path.DOG}`} className="text-[14px] font-bold mb-[15px]">
            {categories && categories.find(el => el._id ===  '662609435f08defa28ecdf73') && (
            <Link
              key={(categories.find(el => el._id === '662609435f08defa28ecdf73').title)}
              to={(categories.find(el => el._id === '662609435f08defa28ecdf73').title)}
            >
            {categories.find(el => el._id === '662609435f08defa28ecdf73').title.toUpperCase()}
            </Link>
                )}
            </Link>
            <div className="flex flex-col gap-[10px]">
              {dogs.map((product) => (
                <span key={Math.random()} className="text-[14px]">
                  {product}
                </span>
              ))}
            </div>
          </div>

          <div className="w-[172px] flex flex-col">
            <Link to={`${path.CAT}`} className="text-[14px] font-bold mb-[15px]">
            {categories && categories.find(el => el._id ===  '662609515f08defa28ecdf75') && (
            <Link
              key={(categories.find(el => el._id === '662609515f08defa28ecdf75').title)}
              to={(categories.find(el => el._id === '662609515f08defa28ecdf75').title)}
            >
            {categories.find(el => el._id === '662609515f08defa28ecdf75').title.toUpperCase()}
            </Link>
                )}
            </Link>
            <div className="flex flex-col gap-[10px]">
              {cats.map((product) => (
                <span key={Math.random() - 10} className="text-[14px]">
                  {product}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-inCategory w-[275px] bg-center bg-cover relative px-[25px] ">
          <div className="absolute top-40 flex flex-col gap-[15px]">
            <span className="w-[73px] h-[25px] bg-[#FF4F52] text-xs font-semibold text-white rounded flex items-center justify-center">
              <Link to={path.PROMOTION}>Khuyến mãi</Link>
            </span>
            <span className="text-white font-bold text-[25px] w-[170px]">
              Các sản phẩm thức ăn
            </span>
            <span className="text-white text-[14px]">108 sản phẩm</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Categories);
