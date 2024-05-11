import React, { memo, useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import path from "utils/path";
import Logo from "assets/imgs/Logo.png";
import icons from "utils/icons";
import { getCurrent } from "store/user/asyncAction";
import Categories from "../Products/Categories";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { logout, clearMessage } from "../../store/user/userSlice";
import { FaCartShopping } from "react-icons/fa6";
import Swal from "sweetalert2";
import { showCart } from "store/reducers/appSlice";

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isShowOption,setIsShowOption] = useState(false)
  const {isLoggedIn, current, mes} = useSelector(state => state.user)

  useEffect(() => {
    const handleClickOutOptions = (e) => {
      const profile = document.getElementById('profile')
      if (!profile?.contains(e.target)) setIsShowOption(false)
      
    }
    document.addEventListener('click' , handleClickOutOptions)
    return () => {
      document.removeEventListener('click', handleClickOutOptions)
    }
  },[])
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent())
    },300)
  return () => {
    clearTimeout(setTimeoutId)
  }

  },[dispatch,isLoggedIn])

  useEffect (() => {
    if (mes) Swal.fire('Lỗi', mes, 'info').then(() => {
      dispatch(clearMessage())
      navigate(`/${path.LOGIN}`)
    })
  },[mes])

  // Thêm useEffect để theo dõi sự thay đổi của current
  useEffect(() => {
    if (isLoggedIn && current) {
    }
  }, [current, isLoggedIn]);
  

  const [isCategories, setIsCategories] = useState(false);
 
  const handleCategories = () => {
    setIsCategories(!isCategories);
  };
  
  return (
    <header className="w-full relative">
      <div className="flex h-[120px] items-center justify-between">
        <div className="flex items-center ml-[75px]">
          <Link to={path.HOME} className="mr-[38px]">
            <img src={Logo} width={122} height={39} alt="Village logo" />
          </Link>

          <div className=" mr-9">
            <span
              onClick={handleCategories}
              className="flex items-center justify-center cursor-pointer"
            >
              <icons.BiSolidCategoryAlt size={24} className="mr-[2px]" />
              <span className="text-xl">Danh mục Village</span>
              <icons.IoChevronDown size={16} className="ml-[2px] mt-[2px]" />
            </span>

            {/******Categories*******/}
            {isCategories && <Categories />}
          </div>

          <div className="flex items-center justify-center text-xl border-2 border-borderColor rounded-[10px] py-4">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              className="w-[384px] ml-[34px] outline-none"
            />
            <icons.IoIosSearch
              sx={{ fontSize: "18px" }}
              className="ml-[110px] mr-[21px]"
            />
          </div>
        </div>

        {isLoggedIn && current 
  ? <div className="flex items-center gap-2 mr-[75px]">
    <div onClick={() => dispatch(showCart())} className="flex items-center mr-[50px]">
      <FaCartShopping className="flex justify-center text-black size-8 hover:text-gray-400 cursor-pointer"/>
      <span className="font-semibold">{`${current?.cart?.length || 0}`}</span>
    </div>
    <div className="relative ">
    <div className="cursor-pointer flex items-center justify-center px-6 gap-2 border-r " 
    onClick={() => setIsShowOption(prev => !prev)}
    id="profile"
    >
    <FaRegUserCircle className="flex justify-center text-black size-8 hover:text-gray-400"/>
          {isShowOption && <div onClick={e => e.stopPropagation()} className="absolute z-50 left-[16px] top-full flex flex-col bg-gray-100 min-w-[150px] border py-2">
            <Link className="p-2 w-full hover:bg-sky-100 " to={`/${path.MEMBER}/${path.PERSONAL}`}>Thông tin cá nhân</Link>
            {+current.role === 1997 && 
            <Link className="p-2 w-full hover:bg-sky-100 " to={`/${path.ADMIN}/${path.DASHBOARD}`}>Quản trị viên</Link>}
            <span onClick={() => dispatch(logout())} className="cursor-pointer p-2 w-full hover:bg-sky-100 ">Đăng xuất</span>
          </div>}

    </div>
    </div>
    {/* <span className="">Profile</span> */}
    <h6 className="text-bg-user font-semibold hover:text-black cursor-pointer">{`Chào mừng, ${current?.lastname} ${current?.firstname}`}</h6>
    {/* <span onClick={() => dispatch(logout())}>
      <FiLogOut className="flex justify-center text-black size-6 hover:text-bg-user cursor-pointer"/>
    </span> */}
  </div>
  : <div className="flex mr-[75px]">
      {/* <Link className="px-[25px] py-4 text-xl rounded-[10px] font-semibold mr-1">
        Đăng ký
      </Link> */}
      <Link 
        className="px-[25px] py-4 bg-buttonColor text-white text-xl rounded-[10px] font-semibold"
        to={path.LOGIN}
      >
        Đăng nhập / Đăng ký
      </Link>
    </div>}

      </div>
    </header>
  );
};

export default memo(Header);
