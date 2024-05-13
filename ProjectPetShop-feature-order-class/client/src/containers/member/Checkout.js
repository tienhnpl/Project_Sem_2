import React, { useEffect, useState } from 'react'
import shoping from 'assets/imgs/Woman Shopping Online.gif'
import { useDispatch, useSelector } from 'react-redux'
import { formatMoney } from 'utils/helpers'
import Paypal from 'components/Common/Paypal'
import { Congrat, InputForm } from 'components'
import { useForm } from 'react-hook-form'
import { getCurrent } from 'store/user/asyncAction'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
    const {currentCart, current} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [isSuccess,setIsSuccess] = useState(false)
    const totalAmount = currentCart?.reduce((sum, el) => {
        if (el?.product?.discount) {
          // Nếu có giảm giá
          return sum + Number(el?.product?.price - (el?.product?.price / 100) * el?.product?.discount) * el?.quantity;
        } else {
          // Nếu không có giảm giá
          return sum + Number(el?.product?.price) * el?.quantity;
        }
      }, 0) / 23500;
    const {register, formState: {errors}, watch, setValue} = useForm()
    const address = watch('address')
    useEffect(() => {
        setValue('address', current?.address)
    },[current?.address])
    useEffect(() => {
      if(isSuccess) {
          dispatch(getCurrent());
      }
  }, [isSuccess, dispatch]);
  return (
    <div className='pr-6 w-full py-8 grid h-full max-h-screen overflow-auto grid-cols-10 gap-6 '>
      {isSuccess && <Congrat/>}
        <div className='w-full flex items-center col-span-4'>
        <img className='h-[70%] object-contain' src={shoping} alt="payment"/>
        </div>
      <div className='w-full justify-center flex flex-col gap-6 col-span-6'>
      <h2 className='text-3xl mb-6 font-bold'>Thanh toán</h2>
      <div className='flex w-full gap-6'>
      <table className='table-auto flex-1'>
        <thead>
        <tr className='border bg-gray-200'>
            <th className='text-left p-2'>Sản phẩm</th>
            <th className='text-center p-2'>Số lượng</th>
            <th className='text-right p-2'>Giá</th>
        </tr>
        </thead>
        <tbody>
            {currentCart?.map(el => (<tr className='border' key={el?.product?._id}>
                <td className='text-left p-2'>{el?.product?.title}</td>
                <td className='text-center p-2'>{el?.quantity}</td>
                <td className='text-right p-2'>{formatMoney(el?.product?.price - (el?.product?.price / 100) * el?.product?.discount)} vnđ</td>
            </tr>))}
        </tbody>
      </table>
        <div className='flex-1 flex flex-col justify-between gap-[45px]'>
        <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between pt-4 border-t-2 border-t-blue-500'>
                <span className='font-medium'>Tổng tiền: </span>
                <span className='text-red-500'>
  {formatMoney(
    currentCart?.reduce((sum, el) => {
      if (el?.product?.discount) {
        // Nếu có giảm giá
        return sum + Number(el?.product?.price - (el?.product?.price / 100) * el?.product?.discount) * el?.quantity;
      } else {
        // Nếu không có giảm giá
        return sum + Number(el?.product?.price)* el?.quantity;
      }
    }, 0)
  ) + ' VNĐ'}
</span>
            </div>
      <div>
        <InputForm
        label={
            <>
              <span>Địa chỉ:</span>
              <span className="text-xs text-red-500">*</span>
            </>
          }
          register={register}
          errors={errors}
          id='address'
          validate={{
            required: 'Hãy điền đủ thông tin'
          }}
          style={'text-sm'}
          fullWidth
          placeholder='Hãy nhập địa chỉ nhận hàng'
        />
      </div>
        </div>
      {<div className='w-full mx-auto'>
        <Paypal 
        payload={{
            products: currentCart, 
            total: Math.round(totalAmount),
            address
        }}
        setIsSuccess={setIsSuccess}
        amount={Math.round(totalAmount)}
        />
      </div>}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Checkout
