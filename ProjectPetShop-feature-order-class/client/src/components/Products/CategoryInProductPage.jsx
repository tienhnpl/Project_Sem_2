import React, { memo, useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux"; // Sửa dòng import
import icons from "../../utils/icons";
import * as actions from "../../store/actions";

const CategoryInProductPage = () => {
  const [isCategory, setIsCategory] = useState(false);
  const [isFoodCategory, setFoodIsCategory] = useState(false);
  const [isBowlCategory, setBowlIsCategory] = useState(false);
  const [isCageCategory, setCageIsCategory] = useState(false);
  const [isJoyCategory, setJoyIsCategory] = useState(false);
  const [isCareCategory, setCareIsCategory] = useState(false);
  const [isCollarCategory, setIsCollarCategory] = useState(false);
  const [isPrice, setIsPrice] = useState(false);
  const [bodyhight, setBodyHight] = useState(0);
  const [cateHight, setCateHight] = useState(500);

  useEffect(() => {
    const scrollFunction = () => {
      var h = document.documentElement.scrollTop;
      var arrowUp2 = document.getElementById("abcd");
      var arrowUpTop = arrowUp2.offsetTop;
      var pageHeight = document.body.clientHeight;
      if (pageHeight !== bodyhight) {
        setBodyHight(pageHeight);
      }
      if (arrowUpTop !== 0) {
        setCateHight(arrowUpTop);
      }
      if (h >= cateHight) {
        arrowUp2.classList.add("fixed", "top-0");
      } else {
        arrowUp2.classList.remove("fixed", "top-0");
      }
    };

    window.addEventListener("scroll", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, [cateHight]);

  //take hight of footer
  const { footerHight } = useSelector((state) => state.interf) || {}; // Đảm bảo rằng footerHight không null hoặc undefined
  const dispatch = useDispatch();

  return (
    <div id="abcd" className="w-[300px] flex flex-col">
      <Scrollbars style={{ width: 300, height: "100%" }}>
        <p className="text-[25px] font-bold text-[#29293E] mb-[20px]">Bộ Lộc</p>
        <div>
          <span
            onClick={() => setIsCategory(!isCategory)}
            className="flex items-center justify-between mb-[14px] cursor-pointer text-[20px]"
          >
            <p className="font-semibold text-[#29293E]">Danh mục sản phẩm</p>
            {isCategory ? <icons.IoIosArrowDown /> : <icons.IoIosArrowForward />}
          </span>

          {isCategory && (
            <div className="text-[20px]">
              <div className="flex flex-col px-5">
                <span
                  className="flex items-center justify-between mb-[14px] cursor-pointer"
                  onClick={() => setFoodIsCategory(!isFoodCategory)}
                >
                  <p>Thức ăn</p>
                  {isFoodCategory ? <icons.IoIosArrowDown /> : <icons.IoIosArrowForward />}
                </span>
                {isFoodCategory && (
                  <div className="flex flex-col gap-[10px] px-[10px] mb-[14px]">
                    <p className="cursor-pointer hover:font-semibold">Bánh thường</p>
                    <p className="cursor-pointer hover:font-semibold">Pate</p>
                    <p className="cursor-pointer hover:font-semibold">Sữa</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col px-5">
                <span
                  className="flex items-center justify-between mb-[14px] cursor-pointer"
                  onClick={() => setBowlIsCategory(!isBowlCategory)}
                >
                  <p>Bát ăn & bình nước</p>
                  {isBowlCategory ? <icons.IoIosArrowDown /> : <icons.IoIosArrowForward />}
                </span>
                {isBowlCategory && (
                  <div className="flex flex-col gap-[10px] px-[10px] mb-[14px]">
                    <p className="cursor-pointer hover:font-semibold">Dụng cụ cho ăn</p>
                    <p className="cursor-pointer hover:font-semibold">Dụng cụ cho uống</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col px-5">
                <span
                  className="flex items-center justify-between mb-[14px] cursor-pointer"
                  onClick={() => setCageIsCategory(!isCageCategory)}
                >
                  <p>Chuồng & nệm</p>
                  {isCageCategory ? <icons.IoIosArrowDown /> : <icons.IoIosArrowForward />}
                </span>
                {isCageCategory && (
                  <div className="flex flex-col gap-[10px] px-[10px] mb-[14px]">
                    <p className="cursor-pointer hover:font-semibold">Chuồng</p>
                    <p className="cursor-pointer hover:font-semibold">nệm thảm</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col px-5">
                <span
                  className="flex items-center justify-between mb-[14px] cursor-pointer"
                  onClick={() => setJoyIsCategory(!isJoyCategory)}
                >
                  <p>Đồ chơi & Huấn luyên</p>
                  {isJoyCategory ? <icons.IoIosArrowDown /> : <icons.IoIosArrowForward />}
                </span>
                {isJoyCategory && (
                  <div className="flex flex-col gap-[10px] px-[10px] mb-[14px]">
                    <p className="cursor-pointer hover:font-semibold">Đồ chơi</p>
                    <p className="cursor-pointer hover:font-semibold">Dụng cụ huấn luyện</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col px-5">
                <span
                  className="flex items-center justify-between mb-[14px] cursor-pointer"
                  onClick={() => setCareIsCategory(!isCareCategory)}
                >
                  <p>Vệ sinh & chăm sóc</p>
                  {isCareCategory ? <icons.IoIosArrowDown /> : <icons.IoIosArrowForward />}
                </span>
                {isCareCategory && (
                  <div className="flex flex-col gap-[10px] px-[10px] mb-[14px]">
                    <p className="cursor-pointer hover:font-semibold">Dụng cụ chăm sóc</p>
                    <p className="cursor-pointer hover:font-semibold">Dụng cụ vệ sinh</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col px-5">
                <span
                  className="flex items-center justify-between mb-[14px] cursor-pointer"
                  onClick={() => setIsCollarCategory(!isCollarCategory)}
                >
                  <p>Vòng cổ & dây dắt</p>
                  {isCollarCategory ? <icons.IoIosArrowDown /> : <icons.IoIosArrowForward />}
                </span>
                {isCollarCategory && (
                  <div className="flex flex-col gap-[10px] px-[10px] mb-[14px]">
                    <p className="cursor-pointer hover:font-semibold">Vòng cổ & thẻ tên</p>
                    <p className="cursor-pointer hover:font-semibold">dây dắt</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div>
          <span
            onClick={() => setIsPrice(!isPrice)}
            className="flex items-center justify-between mb-[14px] cursor-pointer text-[20px]"
          >
            <p className="font-semibold text-[#29293E]">Nhập khoảng giá</p>
            {isPrice ? <icons.IoIosArrowDown /> : <icons.IoIosArrowForward />}
          </span>
          {isPrice && (
            <div className="flex flex-col gap-[15px]">
              <div className="flex items-center border-[#dddddd] border-[2px] rounded-[10px] py-4 h-[57px] overflow-hidden">
                <div className="bg-[#e6e6e6] w-[55px] text-[#29293E] font-semibold text-[20px] py-6 flex items-center justify-center">
                  $
                </div>
                <input
                  type="text"
                  placeholder="Giá thấp nhất"
                  className="flex-auto py-6 pl-[10px] outline-none bg-[#f9f9f9] text-[20px]"
                />
              </div>
              <div className="flex items-center border-[#dddddd] border-[2px] rounded-[10px] py-4 h-[57px] overflow-hidden">
                <div className="bg-[#e6e6e6] w-[55px] text-[#29293E] font-semibold text-[20px] py-6 flex items-center justify-center">
                  $
                </div>
                <input
                  type="text"
                  placeholder="Giá thấp nhất"
                  className="flex-auto py-6 pl-[10px] outline-none bg-[#f9f9f9] text-[20px]"
                />
              </div>
            </div>
          )}
        </div>
      </Scrollbars>
    </div>
  );
};

export default memo(CategoryInProductPage);
