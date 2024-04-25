import { Routers } from "./Routers";
import Home from "../Pages/users/Home";
import { Route, Routes } from "react-router-dom";
import MasterLayout from "./MasterLayout";

function RoutersCustom() {
  const userRouters = [{ path: Routers.User.HOME, component: <Home /> }];
  return (
    <MasterLayout>
      <Routes>
        {userRouters.map((item, index) => (
          <Route key={index} path={item.path} element={item.component} />
        ))}
      </Routes>
    </MasterLayout>
  );
}

export default RoutersCustom;
