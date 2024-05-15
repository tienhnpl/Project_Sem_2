import React, { memo, useState } from "react";
import Test from "assets/imgs/testItem.png";
// import star from "../assets/imgs/star.png";
import {renderStarFromNumber} from '../../utils/helpers'
import { SelectOption } from "components";
import { FaCartPlus } from "react-icons/fa";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { apiUpdateCart } from "apis";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "store/user/asyncAction";
import Swal from "sweetalert2";
import path from "utils/path";
import { BsFillCartCheckFill } from "react-icons/bs";


const Card = ({productData}) => {
  let newPrice = productData?.price - (productData?.price / 100) * productData?.discount;
const [isShowOption, setIsShowOption] = useState()
const {current} = useSelector(state => state.user)
const navigate = useNavigate()
const dispatch = useDispatch()
const location = useLocation()
const handleClickOption = async(e, flag) => {
  e.stopPropagation()
  if (flag === 'SHOPING') {
      if (!current) return Swal.fire({
        title: 'Chưa đăng nhập',
        text: 'Hãy đăng nhập để mua hàng',
        icon: 'info',
        cancelButtonText: 'Trở lại',
        showCancelButton: true,
        confirmButtonText: 'Đi tới trang đăng nhập'
    
      }).then((rs) => {
        if (rs.isConfirmed) navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({redirect: location.pathname}).toString()
        })
      })
        // console.log(productData);
        const response = await apiUpdateCart({pid: productData?._id, subcategory: productData?.subcategory, quantity:1, title: productData?.title})
        // console.log(productData.subcategory);
        if (response.success) {
          toast?.success(response?.mes)
          dispatch(getCurrent());
        }
          else toast?.error(response?.mes)
    }
}

// image={el.thumb}
      // title={el.title}
      // star={renderStarFromNumber(el.totalRatings)}
      // sold={el.sold}
      // discount={el.discount}
      // price={el.price}
  return (
    <div 
    className="flex m-auto flex-col px-1 cursor-pointer round items-center rounded-[10px] shadowItem overflow-hidden w-[308px]"
    // onClick={(e) => {
    //   navigate(`/${el?.category?.toLowerCase()}/${el?.subcategories[0]}/${el?._id}/${el?.title}`);
    //   window.scrollTo({ top: 0, behavior: 'smooth' });
    // }}
    onMouseEnter={e => {
      e.stopPropagation()
      setIsShowOption(true)
    }}
    onMouseLeave={e => {
      e.stopPropagation()
      setIsShowOption(false)
    }}
    >
      <div className="w-full relative">
      {isShowOption && (
  <div className="absolute bottom-0 flex left-0 right-0 justify-center animate-slide-top">
    {current?.cart?.some(el => el?.product === productData?._id.toString()) ? (
      <span title="Sản phẩm đã thêm">
        <SelectOption icon={<BsFillCartCheckFill size={40} color="green" />} />
      </span>
    ) : (
      <span title="Thêm vào giỏ hàng" onClick={(e) => handleClickOption(e, 'SHOPING')}>
        <SelectOption icon={<FaCartPlus size={40} />} />
      </span>
    )}
  </div>
)}

      <img
        src={productData?.thumb}
        height={300}
        width={300}
        className="object-cover rounded-[10px]"
      />
      </div>
      <p className="text-[#2E2437] font-medium text-2xl mt-[18px] text-justify h-[96px]">
  {typeof productData?.title === 'string' && productData?.title.length >= 72 ? `${productData?.title.slice(0, 72)}...` : productData?.title}
</p>

      <div className="mt-5 flex w-full">
        <div className="flex items-center">
          {/* {Array.from({ length: 4 }).map((_, index) => ( */}
          {renderStarFromNumber(productData?.totalRatings)}
              {/* src={star}
              height={15}
              width={15}
              key={Math.random()}
              className="h-[15px]" */}
          {/* ))} */}
        </div>
        <p className="ml-[10px] text-[#92888F]">(Đã bán {productData?.sold} sản phẩm)</p>
      </div>
      <div className="mt-[10px] flex w-full items-center gap-2">
      {newPrice && (
  <p className="text-[#2E2437] text-[26px] font-extrabold">
    {newPrice.toLocaleString()} <span className="underline">đ</span>
  </p>
)}
        {productData?.discount !== 0 && (
          <>
            <p className="text-[#92888F] text-[26px] line-through">
              {productData?.price.toLocaleString()} <span className="underline">đ</span>
            </p>
            <p className="text-[#DF0000] text-[26px]">-{productData?.discount}%</p>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Card);
