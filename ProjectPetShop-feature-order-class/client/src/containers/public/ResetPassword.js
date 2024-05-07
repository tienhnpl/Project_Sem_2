import React, {useState} from 'react'
import { Button } from '../../components'
import logo from '../../assets/imgs/Logo.png';
import resetImage from '../../assets/imgs/Resetpassword.jpg'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { apiResetPassword } from '../../apis/user';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [password, setPassword] = useState('')

    const {token} = useParams()

    const handleResetPassword = async () => {
        const response = await apiResetPassword({password, token})
        if (response.success){
            toast.success(response.mes, {theme: 'colored'})
          }else {
            toast.info(response.mes, {theme: 'colored'})
          }
    }
  return (
    <div>
      <div className="absolute bg-bg-ct animate-slide-right top-0 left-0 bottom-0 right-0 z-50 flex flex-col md:flex-row items-stretch h-screen ">
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
          <img src={resetImage} alt="Login Visual" className="rounded-lg" style={{ maxWidth: '100%', maxHeight: '60vh', height: 'auto' }} />
        </div>
      </div>
      {/* Phần bên phải với form đăng nhập */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <div className="w-full max-w-md">
          <label className="text-[35px] leading-[54.47px] text-center font-extrabold mb-8" htmlFor="password">Nhập mật khẩu mới</label>
          {/* Trường nhập tên người dùng */}
          <div className="flex items-center mb-6">
            <input 
            type="text" 
            id="password"
            className='flex-1 py-2 border w-full mt-[16px] rounded-sm px-4 outline-none placeholder:text-sm placeholder:italic'
            placeholder="Nhập mật khẩu mới vào đây"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            </div>
          
          <Button
          name='Xác nhận'
          handdleOnClick={handleResetPassword}
          fw
          />    
        </div>
      </div>
        </div>
    </div>
  )
}

export default ResetPassword
