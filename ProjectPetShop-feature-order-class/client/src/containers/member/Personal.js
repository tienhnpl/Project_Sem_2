import { Button, InputForm } from 'components'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import avatar from 'assets/imgs/avatarUser.png'
import { apiUpdateCurrent } from 'apis'
import { getCurrent } from 'store/user/asyncAction'
import { toast } from 'react-toastify'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Personal = () => {
  const {register, formState: {errors, isDirty}, handleSubmit, reset} = useForm()
  const {current} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('redirect'));


  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      mobile: current?.mobile,
      email: current?.email,
      avatar: current?.avatar,
      address: current?.address,

    })
  },[current])

  const handleUpdateInfor = async (data) => {
    const formData = new FormData()
    if (data.avatar.length > 0) formData.append('avatar', data.avatar[0])  
    delete data.avatar
    for(let i of Object.entries(data)) formData.append(i[0], i[1])

    const response = await apiUpdateCurrent(formData)
    if (response.success) {
      dispatch(getCurrent())
      toast.success(response.mes)
      if (searchParams.get('redirect')) navigate(searchParams.get('redirect'))
    }else toast.error(response.mes)
  } 
  return (
    <div className='w-full relative px-4'>
      <header className='text-3xl font-semibold py-4 border-b-2 border-b-blue-400'>
        Thông tin cá nhân
      </header>
      <form onSubmit={handleSubmit(handleUpdateInfor)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
      <InputForm
          label='Họ'
          register={register}
          errors={errors}
          id='lastname'
          validate={{
            required: 'Hãy điền đủ thông tin'
          }}
          />
        <InputForm
          label='Tên'
          register={register}
          errors={errors}
          id='firstname'
          validate={{
            required: 'Hãy điền đủ thông tin'
          }}
          />
        <InputForm
          label='Email'
          register={register}
          errors={errors}
          id='email'
          validate={{
            required: 'Hãy điền đủ thông tin',
            pattern: {value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: 'Email không chính xác'}
          }}
          />
        <InputForm
          label='Số điện thoại'
          register={register}
          errors={errors}
          id='mobile'
          validate={{
            required: 'Hãy điền đủ thông tin',
            pattern: {
              value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
              message: 'Số điện thoại không chính xác'
            }
          }}
          />
          <InputForm
          label='Địa chỉ'
          register={register}
          errors={errors}
          id='address'
          validate={{
            required: 'Hãy điền đủ thông tin',
          }}
          />    
          <div className='flex items-center gap-2 '>
            <span className='font-medium'>Trạng thái tài khoản:</span>
            <span className={current?.isBlocked ? 'text-red-500' : 'text-green-600'}>
              {current?.isBlocked ? 'Đã khóa' : 'Đang hoạt động'}
            </span>
          </div>
          <div className='flex items-center gap-2 '>
            <span className='font-medium'>Vai trò:</span>
            <span className={current?.role ? 'text-red-500' : 'text-green-600'}>
              {+current?.role === 1997 ? 'Quản trị viên' : 'Người dùng'}
            </span>
          </div>
          <div className='flex items-center gap-2 '>
            <span className='font-medium'>Ngày tạo:</span>
            <span>{moment(current?.createdAt).format('DD/MM/YYYY')}</span>
          </div>
          <div className='flex flex-col gap-2'>
          <span className='font-medium'>Hình đại diện</span>
            <label className='flex flex-col' for="file">
            <img src={current?.avatar || avatar} alt="avatar" className='w-20 h-20 object-cover rounded-full'/>
            <span className='cursor-pointer hover:underline text-red-500'>Chỉnh Sửa</span>
            </label>
            <input type="file" id="file" {...register('avatar')} hidden/>
          </div>
          {isDirty && <div className='w-full flex justify-end'>
          <Button fw type='submit'>Cập nhật</Button>
          </div>}     
      </form>
    </div>
  )
}

export default Personal
