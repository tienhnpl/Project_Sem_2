import { Breadcrumbs, Button, OrderItem, SelectQuantity } from 'components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { formatMoney } from 'utils/helpers'
import path from 'utils/path'

const DetailCart = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const {currentCart} = useSelector(state => state.user)
    const handleChangeQuantites = (pid, quantity) => {
        console.log({pid, quantity});
    }
  return (
    <div className='p-6 flex flex-col'>
      <div className='w-full px-12'>
        <h3 className='font-semibold text-2xl uppercase'>Giỏ hàng</h3>
        {/* <Breadcrumbs category={(location?.pathname?.replace('/','')?.split('-')?.join(' '))} /> */}

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
    <Link target='_blank' className='bg-black text-white px-4 py-2 rounded-md' to={`/${path.CHECKOUT}`}>Thanh toán</Link>
</div>    
</div>
      </div>
  )
}

export default DetailCart
