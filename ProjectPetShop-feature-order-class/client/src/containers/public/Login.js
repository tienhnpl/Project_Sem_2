import React, {useState, useCallback, useEffect} from "react";
import { Link, useSearchParams } from "react-router-dom";
import logo from 'assets/imgs/Logo.png';
import image from 'assets/imgs/Login.jpg';
import forgotImage from 'assets/imgs/Forgotpassword.jpg'
import { FaGoogle, FaFacebook, FaUserAlt, FaLock } from 'react-icons/fa';
import {InputField, Button, Loading} from 'components/index'
import { MdEmail } from "react-icons/md";
import {apiRegister, apiLogin, apiForgotPassword} from 'apis/user'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "utils/path";
import {register} from 'store/user/userSlice'
import { showModal } from 'store/reducers/appSlice';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validate } from "utils/helpers";

const Login = () => {
const navigate = useNavigate()
const dispatch = useDispatch()
  const [payload, setPayLoad] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    mobile: ''
  })
  const [invalidFields, setInvalidFields] = useState([])
  const [isForgotPassword, setisForgotPassword] = useState(false)

  const [isRegister, setIsRegister] = useState(false)
  const [searchParams] = useSearchParams()
  console.log(searchParams.get('redirect'));
  const resetPayload = () => {
    setPayLoad({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    mobile: ''
    })
  }

  const [email, setEmail] = useState('')
  
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({email})
    if (response.success){
      toast.success(response.mes, {theme: 'colored'})
    }else {
      toast.info(response.mes, {theme: 'colored'})
    }
  }

  useEffect(() => {
    resetPayload()
  }, [isRegister])

  const handleSubmit = useCallback(async() => {
    const {firstname, lastname, mobile, ...data} = payload

    const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields)

    if (invalids === 0){
      if (isRegister){
        dispatch(showModal(true, <Loading />))
        const response = await apiRegister(payload)
        dispatch(showModal(false, null))
        if (response.success) {
          Swal.fire(
            'Congatulation', response.mes,
            'Success'
          ).then(() => {
            setIsRegister(false)
            resetPayload()
          })
        }else Swal.fire('Oops!', response.mes,'error')
  
      }else {
        const rs = await apiLogin(data)
        console.log(rs);
        if (rs.success) {
          dispatch(register({isLoggedIn: true, token: rs.accessToken, userData: rs.userData}))
          searchParams.get('redirect') ? navigate(searchParams.get('redirect')) : navigate(`/${path.HOME}`)
        }else {
          Swal.fire(
            'Oops!', rs.mes,
            'error'
          
          )
        }
      }
    }
    
  //   if (invalids === 0){
  //     if (isRegister){
  //         dispatch(showModal(true, <Loading />))
  //         try {
  //             const response = await apiRegister(payload)
  //             if (response.success) {
  //                 Swal.fire(
  //                     'Congatulation', response.mes,
  //                     'success'
  //                 ).then(() => {
  //                     setIsRegister(false)
  //                     resetPayload()
  //                 })
  //             } else {
  //                 Swal.fire('Oops!', response.mes, 'error')
  //             }
  //         } catch (error) {
  //             Swal.fire('Oops!', 'There was an error while registering', 'error')
  //         } finally {
  //             dispatch(showModal(false, null))
  //         }
  //     } else {
  //         try {
  //             const rs = await apiLogin(data)
  //             console.log(rs);
  //             if (rs.success) {
  //                 dispatch(register({isLoggedIn: true, token: rs.accessToken, userData: rs.userData}))
  //                 navigate(`/${path.HOME}`)
  //             } else {
  //                 Swal.fire('Oops!', rs.mes, 'error')
  //             }
  //         } catch (error) {
  //             Swal.fire('Oops!', 'There was an error while logging in', 'error')
  //         }
  //     }
  // }
  
    
  },[payload, isRegister])

  const backgroundColor = '#CFF1F1'; // Đặt màu nền dựa trên mẫu trong Figma
  return (
    <div className="flex flex-col md:flex-row items-stretch h-screen relative" style={{ backgroundColor }}> {/* Change layout to column on small screens */}
        {isForgotPassword && 
        <div className="absolute bg-bg-custom animate-slide-right top-0 left-0 bottom-0 right-0 z-50 flex flex-col md:flex-row items-stretch h-screen ">
          {/* Left section with image, logo, and title */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-10 items-center"> {/* Use full width on small screens */}
        {/* Logo at the top */}
        <div className="w-full flex justify-start md:justify-center md:mt-10">
          <Link to="/">
            <img src={logo} alt="PetVillage Logo" className="w-36 rounded-lg" />
          </Link>
        </div>
        {/* Title */}
        <div className="hidden md:block text-center my-10">
          <span className="text-4xl font-extrabold">Hệ thống siêu thị thú cưng</span>
        </div>
        {/* Large image */}
        <div className=" w-full flex justify-center">
          <img src={forgotImage} alt="Login Visual" className="rounded-lg" style={{ maxWidth: '100%', maxHeight: '60vh', height: 'auto' }} />
        </div>
      </div>
      {/* Phần bên phải với form đăng nhập */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <div className="w-full max-w-md">
          <label className="text-[35px] leading-[54.47px] text-center font-extrabold mb-8" htmlFor="email">Nhập vào email</label>
          {/* Trường nhập tên người dùng */}
          <div className="flex items-center mb-6">
            <input 
            type="text" 
            id="email"
            className='flex-1 py-2 border w-full mt-[16px] rounded-sm px-4 outline-none placeholder:text-sm placeholder:italic'
            placeholder="VD: email@gmail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
            </div>
          
          <Button
          name='Xác nhận'
          handdleOnClick={handleForgotPassword}
          fw
          /> 
          <Button
          name='Trở lại'
          handdleOnClick={() => setisForgotPassword(false)}
          style='bg-bg-custom text-black py-3 mb-4 font-semibold rounded-lg w-full'
          fw
          />       
        </div>
      </div>
        </div>}

      {/* Left section with image, logo, and title */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-10 items-center"> {/* Use full width on small screens */}
        {/* Logo at the top */}
        <div className="w-full flex justify-start md:justify-center md:mt-10">
          <Link to="/">
            <img src={logo} alt="PetVillage Logo" className="w-36 rounded-lg" />
          </Link>
        </div>
        {/* Title */}
        <div className="hidden md:block text-center my-10">
          <span className="text-4xl font-extrabold">Hệ thống siêu thị thú cưng</span>
        </div>
        {/* Large image */}
        <div className="w-full flex justify-center">
          <img src={image} alt="Login Visual" className="rounded-lg" style={{ maxWidth: '100%', maxHeight: '60vh', height: 'auto' }} />
        </div>
      </div>
      {/* Phần bên phải với form đăng nhập */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-[40px] leading-[54.47px] text-center font-extrabold mb-8">{isRegister ? 'Đăng ký': 'Đăng nhập'}</h2>
          {/* Trường nhập tên người dùng */}
          {isRegister && <div className="flex items-center gap-2 mb-6">
            <FaUserAlt className="mr-4 w-[20px]" />
            {/* <input type="text" placeholder="Tài khoản" className="flex-1 py-2 border-b-2 outline-none" /> */}
            <InputField
            value={payload.firstname}
            setValue={setPayLoad}
            nameKey='firstname'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            fullWidth
            />
            {/* <input type="text" placeholder="Tài khoản" className="flex-1 py-2 border-b-2 outline-none" /> */}
            <InputField
            value={payload.lastname}
            setValue={setPayLoad}
            nameKey='lastname'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            fullWidth
            />
            </div>}

          <div className="flex items-center mb-6">
            <MdEmail className="mr-4"/>
            <InputField
            value={payload.email}
            setValue={setPayLoad}
            nameKey='email'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            fullWidth
            />
            </div>

            {isRegister && <div className="flex items-center mb-6">
            <MdEmail className="mr-4"/>
            <InputField
            value={payload.mobile}
            setValue={setPayLoad}
            nameKey='mobile'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            fullWidth
            />
            </div>}
            
            <div className="flex items-center mb-6">
            <FaLock className="mr-4" />
            <InputField
            value={payload.password}
            setValue={setPayLoad}
            nameKey='password'
            type={'password'}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            fullWidth
            />
          </div>
          
          <Button
          handdleOnClick={handleSubmit}
          fw
          >
            {isRegister ? 'Đăng ký' : 'Đăng nhập'}
          </Button>
          {/* Đăng nhập qua mạng xã hội */}
          {!isRegister && <div className="text-sm">
            Chưa có tài khoản?
          <Link onClick={() => setIsRegister(true)} className="text-black font-semibold mb-2"> Đăng ký ngay!</Link>
          </div>}
            {!isRegister && <div className="flex flex-col justify-center">
              <Link onClick={() => setisForgotPassword(true)} className="text-black font-semibold mb-2 text-[15px]">Quên mật khẩu</Link>    
            </div>}
            {!isRegister && <div className="flex justify-center">
              <Link to={`/${path.HOME}`} className="text-blue-500 font-semibold mb-2 text-[15px]">Trở về trang chủ</Link>
            </div>}
            {isRegister && <div className="flex flex-col justify-center">
              <Link onClick={() => setIsRegister(false)} className="text-black font-semibold mb-2 w-full text-center">Đi tới trang đăng nhập</Link>
            </div>}
            <div className="flex justify-center items-center my-4 space-x-4">
  {/* Google button */}
  <button className="flex items-center justify-center bg-[#db4437] text-white rounded w-[217px] h-[66px] shadow-lg">
    <FaGoogle className="mr-2 text-xl" />
    Google
  </button>
  {/* Facebook button */}
  <button className="flex items-center justify-center bg-[#4267b2] text-white rounded w-[217px] h-[66px] shadow-lg">
    <FaFacebook className="mr-2 text-xl" />
    Facebook
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
