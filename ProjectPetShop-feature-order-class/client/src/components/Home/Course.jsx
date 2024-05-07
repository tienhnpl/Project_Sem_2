import React, { memo } from "react";
import course from "assets/imgs/course.png";
import square from "assets/imgs/square.png";
import icons from "utils/icons";
const Course = () => {
  return (
    <div className="flex mt-[107px] bg-homePink h-[615px]">
      <div className="w-[50%] flex-auto relative">
        <img
          src={square}
          height={440}
          width={570}
          className="absolute z-10 top-12 left-[100px]"
        />
        <img
          src={course}
          height={440}
          width={570}
          className="absolute z-20 top-[88px] left-[140px]"
        />
      </div>
      <div className="w-[50%] flex-auto flex flex-col justify-center gap-[30px] pr-[100px] pl-11">
        <p className="text-[40px] font-extrabold text-[#2E2437]">
          Khoá học cắt tỉa lông
        </p>
        <p className="text-[20px] text-[#92888F] text-justify">
          Pet Village Academy là nơi dành cho các bạn muốn học cắt tỉa lông thú
          cưng, đào tạo Grooming cơ bản tới chuyên nghiệp cho các học viên. Với
          những bạn muốn theo học quy trình chuẩn quốc tế, hãy đến với khóa học
          cắt tỉa lông chó mèo chuyên nghiệp Level C của Pet Village.
        </p>
        <span className="text-[#F04F3C] text-[20px] font-semibold flex items-center rounded-md cursor-pointer hover:font-bold hover:text-[#ff4646]">
          <p className="mr-[10px]">Xem thêm </p> <icons.FaArrowRightLong />
        </span>
      </div>
    </div>
  );
};

export default memo(Course);
