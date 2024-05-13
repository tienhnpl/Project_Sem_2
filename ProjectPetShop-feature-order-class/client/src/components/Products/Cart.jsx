import { Button } from 'components';
import React, { memo } from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { showCart } from 'store/reducers/appSlice';
import { formatMoney } from 'utils/helpers';
import { IoTrashBinOutline } from "react-icons/io5";
import { apiRemoveCart } from 'apis';
import { getCurrent } from 'store/user/asyncAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import path from 'utils/path';

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentCart} = useSelector(state => state.user)
    const removeCart = async(pid) => {
        const response = await apiRemoveCart(pid)
    if (response.success) {
      dispatch(getCurrent());
    }
      else toast.error(response.mes)
    }
    // console.log(current);
  return (
    <div onClick={e => e.stopPropagation()} className='w-[600px] h-screen grid grid-rows-10 bg-white p-6'>
      <header className=' border-b-2 flex justify-between items-center border-blue-500 row-span-1 h-full font-bold text-2xl'>
        <span>Giỏ hàng của bạn</span>
        <span onClick={() => dispatch(showCart())} className='cursor-pointer p-2'><IoCloseCircleSharp title='Đóng'/></span>
      </header>
      <section className='row-span-6 flex flex-col gap-3 h-full max-h-full overflow-y-auto py-3'>
        {!currentCart && <span className='text-xs italic'>Không có sản phẩm nào được thêm</span>}
        {currentCart && currentCart?.map(el => (
            <div key={el?._id} className='flex justify-between items-center'>
                <div className='flex gap-2'>
                <img src={el?.product?.thumb} alt="thumb" className='w-16 h-16 object-cover' />
                <div className='flex flex-col gap-1 '>
                    <span className='font-bold'>{el?.product?.title}</span>
                    <span className='text-xs font-semibold'>{el?.subcategory}</span>
                    <span className='text-xs font-semibold'>{`Số lượng: ${el?.quantity}`}</span>
                    <div className='text-sm'>Giá: <span className='text-base text-red-500'>{formatMoney(el?.product?.price)} vnđ</span></div>
                    <div className='text-sm'>Giảm giá: <span className='text-base text-red-500'>{el?.product?.discount}%</span></div>
                    <div className='text-sm'>Giá mới: <span className='text-base text-red-500'>{formatMoney(el?.product?.price - (el?.product?.price / 100) * el?.product?.discount)} vnđ</span></div>

                </div>
                </div>
                <span onClick={() => removeCart(el?.product?._id)} className='h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-700 cursor-pointer'><IoTrashBinOutline style={20}/></span>
            </div>
        ))}
        </section>  
        <div className='row-span-3 h-full flex flex-col justify-between'>
            <div className='flex items-center justify-between pt-4 border-t-2 border-t-blue-500'>
                <span>Tổng tiền: </span>
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
            <span className='text-center text-gray-700 italic text-xs'>Cám ơn đã ủng hộ PETVILLAGE</span>
        <Button handdleOnClick={() => {
            dispatch(showCart())
            navigate(`/${path.MEMBER}/${path.DETAIL_CART}`)
        }} fw>Mua hàng</Button>
        </div>

    </div>
  )
}

export default memo(Cart)
