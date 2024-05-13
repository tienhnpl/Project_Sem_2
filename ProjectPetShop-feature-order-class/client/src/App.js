import { useDispatch, useSelector } from "react-redux"; //UseSelector lấy dữ liệu từ redux, useDispatch đi tới redux
import { Routes, Route } from "react-router-dom";
import "./App.css";
import appReducer from "./store/reducers/appReducer";
import {
  Home,
  Public,
  Login,
  DogProduct,
  CatProduct,
  Promotion,
  DetailProduct,
  Blog,
  FinalRegister,
  ResetPassword,
  Products,
  DetailCart
} from "./containers/public";
import {
  AdminLayout,
  ManageOrder,
  ManageProducts,
  ManageUser,
  CreateProducts, 
  Dashboard
} from 'containers/admin';
import {
  MemberLayout,
  Personal,
  History,
  MyCart,
  Checkout
} from 'containers/member';
import path from "./utils/path";
import * as actions from "./store/actions";
import { useEffect } from "react";
import {getCategories} from './store/actions/asyncActions'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Cart, Modal } from "./components";
import { showCart } from "store/reducers/appSlice";


function App() {
  const dispatch = useDispatch()
  const {isShowModal, modalChildren, isShowCart} = useSelector(state => state.modal)
  useEffect(() => {
    dispatch(getCategories())
  },[])

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(actions.getProducts());
  // }, []);

  return (
    <>
      <div className="relative">
        {isShowCart && <div onClick={() => dispatch(showCart())} className="absolute inset-0 bg-overlay z-50 flex justify-end">
          <Cart/>
        </div> }
        {isShowModal && <Modal>{modalChildren}</Modal>}
        <Routes>
            <Route path={path.CHECKOUT} element={<Checkout />} />
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLLE} element={<DetailProduct/>} />
            <Route path={path.BLOGS} element={<Blog/>} />
            <Route path={path.DOG} element={<DogProduct />} />
            <Route path={path.CAT} element={<CatProduct />} />
            <Route path={path.PROMOTION} element={<Promotion />} />
            <Route path={path.STAR} element={<Home />} />
            <Route path={path.PRODUCTS} element={<Products />} />
            <Route path={path.ALL} element={<Home />} />
          </Route>
          <Route path={path.ADMIN} element={<AdminLayout/>}>
            <Route path={path.DASHBOARD} element={<Dashboard/>}/>
            <Route path={path.MANAGE_ORDER} element={<ManageOrder/>}/>
            <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts/>}/>
            <Route path={path.MANAGE_USER} element={<ManageUser/>}/>
            <Route path={path.CREATE_PRODUCTS} element={<CreateProducts/>}/>
          </Route>
          <Route path={path.MEMBER} element={<MemberLayout/>}>
            <Route path={path.PERSONAL} element={<Personal/>}/>
            <Route path={path.MY_CART} element={<DetailCart/>}/>
            <Route path={path.HISTORY} element={<History/>}/>
          </Route>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        </Routes>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        {/* Same as */}
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
