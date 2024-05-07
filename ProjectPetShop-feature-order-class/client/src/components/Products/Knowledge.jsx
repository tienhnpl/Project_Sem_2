import React, { memo, useEffect } from "react";

import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { UseSelector, useSelector } from "react-redux";
import PaperCard from "../Home/PaperCard";
const Knowledge = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getNews());
  }, []);
  const { news } = useSelector((state) => state.paper);
  return (
    <div className="px-12">
      <div className="flex justify-between items-center mb-[50px]">
        <p className="text-[#2E2437] font-bold text-[40px]">
          Kiến thức chăm sóc chó mèo
        </p>
        <span className="font-semibold text-[20px] text-[#000000]">
          Xem tất cả
        </span>
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
