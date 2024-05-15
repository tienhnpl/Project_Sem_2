import { apiGetUserOrders } from 'apis'
import { CustomSelect, InputForm, Pagination } from 'components'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { statusOrder } from 'utils/contantsDetail';

const History = () => {
  const [order,setOrder] = useState(null)
  const {register, formState: {errors}, watch, setValue} = useForm()
  const [counts,setCounts] = useState(0)
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const q = watch('q')
  const status = watch('status')
  // Hàm định dạng số tiền từ USD sang VND
const formatCurrencyVND = (amountInUSD) => {
  const exchangeRate = 23500; // Ví dụ tỷ giá 1 USD = 23,000 VND
  const amountInVND = amountInUSD * exchangeRate;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amountInVND);
};
  const fetchOrders = async(params) => {
    const response = await apiGetUserOrders({...params, limit: process.env?.REACT_APP_PRODUCT_LIMIT})
    if (response.success) {
      setOrder(response.orders)
      setCounts(response.counts)
    }   
  }

useEffect (() => {
  const pr = Object.fromEntries([...params])
  fetchOrders(pr)
},[params])  

const handleSearchStatus = ({value}) => {
  navigate({
    pathname: location.pathname,
    search: createSearchParams({status: value}).toString()
  })
}
  return (
    <div className='w-full relative px-4'>
    <header className='text-3xl font-semibold py-4 border-b border-b-blue-500'>
      History
    </header>
    <div className='flex justify-end items-center px-4'>
        <form className='w-[45%] grid gird-cols-2 gap-4'>
          <div className='col-span-1 flex items-center'>
          <CustomSelect
          options={statusOrder}
          value={status}
          onChange={val => handleSearchStatus(val)}
          wrapClassname={' w-full'}
          />
          </div>
        </form>
      </div>
      <table className='table-auto w-full'>
          <thead>
          <tr className='border bg-white w-full border=white'>
            <th className='text-center py-2'>STT</th>
            <th className='text-center py-2'>Sản phẩm</th>
            <th className='text-center py-2'>Tổng tiền</th>
            <th className='text-center py-2'>Trạng thái</th>
            <th className='text-center py-2'>Ngày mua</th>
            <th className='text-center py-2'>Hành động</th>
          </tr>
          </thead>
          <tbody>
            {order?.map((el, idx) => (
              <tr className='border-b' key={el._id}>
                <td className='text-center py-2'>{((+params.get('page')>1 ? +params.get('page')-1 : 0) * process.env.REACT_APP_PRODUCT_LIMIT) + idx + 1}</td>
                <td className='text-center py-2'>
                  <span className='flex flex-col'>
                    {el.products?.map(item => <span key={item._id}>
                      {`• ${item.title}`}
                    </span>)}
                  </span>
                </td>
                <td className='text-center py-2'>{formatCurrencyVND(el.total)}</td>
                <td className='text-center py-2'>{el.status}</td>
                <td className='text-center py-2'>{moment(el.createAt).format('DD/MM/YYYY')}</td>
                <td className='text-center py-2'>
                  {/* <div className='flex justify-center items-center'>
                  <span onClick={() => setEditProduct(el)} className='text-blue-500 inline-block hover:underline hover:text-orange-500 cursor-pointer px-1'><FaEdit size={20}/></span>
                  <span onClick={() => hendleDeleteProduct(el._id)} className='text-blue-500 inline-block hover:underline hover:text-orange-500 cursor-pointer px-1'><IoTrashBin size={20}/></span>
                  </div> */}
                </td>
              </tr>
            ))}
          </tbody>
      </table>
      <div className='w-full flex justify-end my-8'>
        <Pagination totalCount={counts}/>
      </div>
    </div>
    
  )
}

export default History
