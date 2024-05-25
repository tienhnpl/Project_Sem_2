import { apiGetOrders } from 'apis'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CustomSelect, Pagination } from 'components'
import moment from 'moment'

const ManageOrder = () => {
  const [orders, setOrders] = useState(null)
  const [counts, setCounts] = useState(0)
  const [params] = useSearchParams()

  const formatCurrencyVND = (amountInUSD) => {
    const exchangeRate = 23500; // Ví dụ tỷ giá 1 USD = 23,000 VND
    const amountInVND = amountInUSD * exchangeRate;
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amountInVND);
  };

  const fetchOrders = async (params) => {
    try {
      const response = await apiGetOrders({ ...params, limit: process.env?.REACT_APP_PRODUCT_LIMIT })
      if (response.success) {
        setOrders(response.orders)
        setCounts(response.counts)
      } else {
        console.error('Failed to fetch orders', response)
      }
    } catch (error) {
      console.error('Error fetching orders', error)
    }
  }
  

  useEffect(() => {
    const pr = Object.fromEntries([...params])
    fetchOrders(pr)
  }, [params])

  return (
    <div className='w-full relative px-4'>
      <header className='text-3xl font-semibold py-4 border-b border-b-blue-500'>
        Quản lý đơn hàng
      </header>
      <div className='flex justify-end items-center px-4'>
        <form className='w-[45%] grid grid-cols-2 gap-4'>
          <div className='col-span-1 flex items-center'>
            <CustomSelect
              // Pass appropriate options and handlers for status selection
              // Example: options={statusOrder}, value={status}, onChange={handleSearchStatus}
            />
          </div>
        </form>
      </div>
      <table className='table-auto w-full'>
        <thead>
          <tr className='border bg-white w-full border=white'>
            <th className='text-center py-2'>STT</th>
            <th className='text-center py-2'>Họ tên</th>
            <th className='text-center py-2'>Email</th>
            <th className='text-center py-2'>Địa chỉ</th>
            <th className='text-center py-2'>Sản phẩm</th>
            <th className='text-center py-2'>Số lượng</th>
            <th className='text-center py-2'>Tổng tiền</th>
            <th className='text-center py-2'>Trạng thái</th>
            <th className='text-center py-2'>Ngày mua</th>
            <th className='text-center py-2'>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((el, idx) => (
            <tr className='border-b' key={el._id}>
              <td className='text-center py-2'>{((+params.get('page') > 1 ? +params.get('page') - 1 : 0) * process.env.REACT_APP_PRODUCT_LIMIT) + idx + 1}</td>
              <td className='text-center py-2'>{`${el.orderBy.firstname} ${el.orderBy.lastname}`}</td>
              <td className='text-center py-2'>{el.orderBy.email}</td>
              <td className='text-center py-2'>{el.orderBy.address}</td>
              <td className='text-center py-2'>
                <span className='flex flex-col'>
                  {el.products?.map(item => <span key={item._id}>{`• ${item.title}`}</span>)}
                </span>
              </td>
              <td className='text-center py-2'>
                <span className='flex flex-col'>
                  {el.products?.map(item => <span key={item._id}>{`${item.quantity}`}</span>)}
                </span>
              </td>
              <td className='text-center py-2'>{formatCurrencyVND(el.total)}</td>
              <td className='text-center py-2'>{el.status}</td>
              <td className='text-center py-2'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
              <td className='text-center py-2'>
                {/* Add action buttons if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-full flex justify-end my-8'>
        <Pagination totalCount={counts} />
      </div>
    </div>
  )
}

export default ManageOrder
