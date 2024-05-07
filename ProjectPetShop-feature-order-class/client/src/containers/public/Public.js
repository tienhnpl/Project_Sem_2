import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../components";
const Public = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const scrollFunction = () => {
      var arrowUp2 = document.getElementById("footer");
      var footerHight = arrowUp2.offsetHeight;
      dispatch(actions.getFooterHight(footerHight));
    };

    scrollFunction();
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="overflow-y-auto">
        <Outlet />
        {/*dùng để hiển thị route con*/}
      </div>

      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Public;
