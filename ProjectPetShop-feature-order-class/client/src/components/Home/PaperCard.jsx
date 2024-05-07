import React, { memo } from "react";
import icons from "utils/icons";
const PaperCard = ({ img, name, content }) => {
  return (
    <div className="flex flex-col gap-y-[15px] w-[396px] overflow-hidden rounded-[10px]">
      <img
        src={img}
        height={250}
        width={396}
        className="object-cover rounded-[10px]"
      />
      <p className="text-[22px] font-bold text-[#2E2437]">{name}</p>
      <p className="text-[18px] text-[#78788C]">
        {content.length >= 90 ? `${content?.slice(0, 90)}...` : content}
      </p>
      <span className="text-[#F04F3C] text-[20px] font-semibold flex items-center rounded-md cursor-pointer hover:font-bold hover:text-[#ff4646]">
        <p className="mr-[10px]">Xem thêm </p> <icons.FaArrowRightLong />
      </span>
    </div>
  );
};

export default memo(PaperCard);
