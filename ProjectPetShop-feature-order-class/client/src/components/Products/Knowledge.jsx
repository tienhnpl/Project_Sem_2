import React, { memo, useEffect } from "react";
import banner1 from 'assets/imgs/husky_resized.jpg'
import banner2 from 'assets/imgs/bullphap_resized.png'
import banner3 from 'assets/imgs/maoanhtaicup_resized.jpg'
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { UseSelector, useSelector } from "react-redux";
import PaperCard from "../Home/PaperCard";
import icons from "utils/icons";

const Knowledge = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getNews());
  }, []);
  const { news } = useSelector((state) => state.paper);
  return (
    <div className="px-12 mt-5">
      <div className="flex justify-between items-center mb-[50px]">
        <p className="text-[#2E2437] font-bold text-[40px]">
          Kiến thức chăm sóc chó mèo
        </p>
        <span className="font-semibold text-[20px] text-[#000000]">
          Xem tất cả
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
  <div className="article">
    <img src={banner1} alt="Chó husky" className="article-image"/>
    <div className="content">
      <h4 className="font-semibold">Chăm sóc chó Alaska 3 tháng tuổi đúng cách và hiệu quả</h4>
      <p className="text-gray-500 italic">Với hình dáng to con cùng với bộ lông mượt mà, dễ thương, chó Alaska ngày càng...</p>
      <span className="text-[#F04F3C] text-[20px] font-semibold flex items-center rounded-md cursor-pointer hover:font-bold hover:text-[#ff4646]">
          <p className="mr-[10px]">Xem thêm </p> <icons.FaArrowRightLong />
        </span>
    </div>
  </div>
  <div className="article">
    <img src={banner2} alt="Bull pháp" className="article-image"/>
    <div className="content">
      <h4 className="font-semibold">Căn bệnh Care ở mèo có triệu chứng như thế nào?</h4>
      <p className="text-gray-500 italic">Bệnh Care ở mèo là một trong những căn bệnh khá là phổ biến và nguy hiểm...</p>
      <span className="text-[#F04F3C] text-[20px] font-semibold flex items-center rounded-md cursor-pointer hover:font-bold hover:text-[#ff4646]">
          <p className="mr-[10px]">Xem thêm </p> <icons.FaArrowRightLong />
        </span>
    </div>
  </div>
  <div className="article">
    <img src={banner3} alt="Mèo anh lông ngắn" className="article-image"/>
    <div className="content">
      <h4 className="font-semibold">Mèo Anh lông ngắn Aln – Thông tin, đặc điểm, cách nuôi</h4>
      <p className="text-gray-500 italic">Mèo Anh lông ngắn hiện đang là giống mèo được ưa chuộng nhất tại Việt Nam...</p>
      <span className="text-[#F04F3C] text-[20px] font-semibold flex items-center rounded-md cursor-pointer hover:font-bold hover:text-[#ff4646]">
          <p className="mr-[10px]">Xem thêm </p> <icons.FaArrowRightLong />
        </span>
    </div>
  </div>
</div>


      <div className="flex justify-between">
        {Array.isArray(news) && news.slice(0, 3).map((item) => {
          return (
            <PaperCard
              key={item?._id}
              img={item?.imgTitle}
              name={item?.title}
              content={item?.heading[0]?.content}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(Knowledge);
