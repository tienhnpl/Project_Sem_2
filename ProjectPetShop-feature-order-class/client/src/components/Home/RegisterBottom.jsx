import React, { memo } from "react";
import registerB from "assets/imgs/registerB.png";
import icons from "utils/icons";

const RegisterBottom = () => {
  return (
    <div className="bg-[#EEB507] mx-[37px] my-[42px] relative h-[370px]">
      <img
        src={registerB}
        height={370}
        width={464}
        className="absolute right-[271px] h-[370px]"
      />
      <div className="h-full w-full flex flex-col justify-center items-center absolute z-20">
        <p className="text-[40px] font-bold text-white mb-[15px]">
          Đăng ký để nhận thông tin mới nhất
        </p>
        <p className="text-[16px] text-white mb-[30px]">
          Giảm giá 20% giá tiền sản phẩm & miễn phí vận chuyển ở đơn hàng tiếp
          theo
        </p>
        <div className="flex gap-[15px] items-center">
          <input
            type="text"
            placeholder="Nhập email của bạn"
            className="w-[264px] h-[40px] outline-none px-4 rounded-md"
          />
          <button className="h-10 w-[115px] rounded-[50px] font-bold mr-1 bg-[#4592FF] text-[14px] text-white flex justify-center items-center">
            Đăng ký <icons.FaArrowRightLong className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(RegisterBottom);
