import { SelectQuantity } from 'components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatMoney } from 'utils/helpers'
import { updateCart } from 'store/user/userSlice'


const OrderItem = ({el, handleChangeQuantites, defaultQuantity=1}) => {
    const dispatch = useDispatch()
    const {current} = useSelector(state => state.user)
    const [quantity, setQuantity] = useState(() => defaultQuantity)
    const handleQuantity = (number) => {
        if (+number > 1) setQuantity(number)
    
      }
      const handleChangeQuantity = (flag) => {
        if (flag === 'minus' && quantity === 1) return
        if (flag === 'minus') setQuantity(prev => +prev -1)
        if (flag === 'plus') setQuantity(prev => +prev +1)
      }
    useEffect (() => {
        dispatch(updateCart(el.product?._id, Number(quantity)));
        // handleChangeQuantites && handleChangeQuantites(el.product?._id,quantity)
    },[quantity])

  return (
    <div className='mt-6 w-full py-3 border-b font-bold grid grid-cols-10'>
            <span className='col-span-4 w-full text-center'>
            <div key={el?._id} className='pl-12 flex justify-between items-center'>
                <div className='flex gap-2'>
                <img src={el?.product?.thumb} alt="thumb" className='w-28 h-28 object-cover' />
                <div className='flex flex-col items-start gap-2 '>
                    <span className='font-bold'>{el?.product?.title}</span>
                    <span className='text-[10px] font-bold'>{el?.subcategory}</span>
                    {/* <div className='text-sm'>Giá: <span className='text-base text-red-500'>{formatMoney(el?.product?.price)} vnđ</span></div>
                    <div className='text-sm'>Giảm giá: <span className='text-base text-red-500'>{el?.product?.discount}%</span></div>
                    <div className='text-sm'>Giá mới: <span className='text-base text-red-500'>{formatMoney(el?.product?.price - (el?.product?.price / 100) * el?.product?.discount)} vnđ</span></div> */}

                </div>
                </div>
            </div>
            </span>
            <span className='col-span-2 w-full text-center items-center flex justify-center'>
                <div className='flex items-center h-full'>
                <SelectQuantity 
            quantity={quantity} 
            handleQuantity={handleQuantity}
            handleChangeQuantity={handleChangeQuantity}
            />
                </div>
            </span>
            <span className='col-span-2 w-full h-full flex items-center justify-center text-center'>
            <span className='text-base text-red-500'>{el?.product?.discount}%</span>
            </span>
            <span className='col-span-2 w-full h-full flex items-center justify-center text-center'>
        <span className='text-base'>{formatMoney((el?.product?.price - (el?.product?.price / 100) * el?.product?.discount)*quantity)} vnđ</span>
            </span>
        </div>
  )
}

export default OrderItem
