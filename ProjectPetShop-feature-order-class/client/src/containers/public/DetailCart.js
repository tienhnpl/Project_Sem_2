import { Breadcrumbs, Button, OrderItem, SelectQuantity } from 'components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { updateCart } from 'store/user/userSlice'
import { formatMoney } from 'utils/helpers'

const DetailCart = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const {currentCart} = useSelector(state => state.user)
    const handleChangeQuantites = (pid, quantity) => {
        console.log({pid, quantity});
        dispatch(updateCart(pid, Number(quantity)));
    }
  return (
    <div className='p-6 flex flex-col'>
      <div className='w-full px-12'>
        <h3 className='font-semibold uppercase'>Giỏ hàng</h3>
        <Breadcrumbs category={(location?.pathname)} />

      </div>
<div className='flex flex-col border w-full mx-auto my-8'>
<div className='mt-6 w-full bg-blue-300 py-3 font-bold grid grid-cols-10'>
            <span className='col-span-4 w-full text-center'>Sản phẩm</span>
            <span className='col-span-2 w-full text-center'>Số lượng</span>
            <span className='col-span-2 w-full text-center'>Giảm giá</span>
            <span className='col-span-2 w-full text-center'>Giá</span>
        </div>
        
        {currentCart?.map(el => {
            return(
                <OrderItem 
                key={el?._id} 
                handleChangeQuantites={handleChangeQuantites} 
                el={el}
                defaultQuantity={el?.quantity}
                />
            )
        })}

    <div className='w-full mx-auto flex flex-col justify-center items-end gap-3'>
    <span className='flex items-center gap-8 text-sm'>
    <span>Tổng tiền: </span>
    <span className='text-red-500 font-bold'>
  {formatMoney(
    currentCart?.reduce((sum, el) => {
      if (el?.product?.discount) {
        // Nếu có giảm giá
        return sum + Number(el?.product?.price - (el?.product?.price / 100) * el?.product?.discount)* el.quantity;
      } else {
        // Nếu không có giảm giá
        return sum + Number(el?.product?.price)*el.quantity;
      }
    }, 0)
  ) + ' VNĐ'}
</span>
    </span>
    <span className='text-sm italic'>Cám ơn quý khách đã ủng hộ PetVillage</span>
    <Button style={'w-[150px] h-[50px] bg-black text-white rounded-md'}>Thanh toán</Button>
</div>    
</div>
      </div>
  )
}

export default DetailCart
