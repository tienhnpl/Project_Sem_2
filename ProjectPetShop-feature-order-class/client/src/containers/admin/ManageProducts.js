import React, { useCallback, useEffect, useState } from 'react'
import { InputForm, Pagination } from 'components'
import { useForm } from 'react-hook-form'
import { getProducts, apiDeleteProduct } from 'apis'
import moment from 'moment'
import { useSearchParams, createSearchParams, useNavigate, useLocation } from 'react-router-dom'
import useDebounce from 'hooks/useDebounce'
import UpdateProduct from './UpdateProduct'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";

const ManageProducts = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const {register, formState: {errors}, watch} = useForm()
  const [products,setProducts] = useState(null)
  const [counts,setCounts] = useState(0)
  const [editProduct,setEditProduct] = useState(null)
  const [update,setUpdate] = useState(false)
  
  const render = useCallback(() => {
    setUpdate(!update)
  })

  const fetchProducts = async(params) => {
    const response = await getProducts({...params, limit: process.env?.REACT_APP_PRODUCT_LIMIT})
    if (response.success) {
      setCounts(response.counts)
      setProducts(response.products)
    }
  }

  const queryDebounnce = useDebounce(watch('q'), 800)
  useEffect(() => {
  if (queryDebounnce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({q: queryDebounnce}).toString()
      })
    }else navigate({
        pathname: location.pathname,
      })
  
  },[queryDebounnce])

  useEffect(() => {
    const searchParams = Object.fromEntries([...params])
    
    fetchProducts(searchParams)
  },[params, update])

  const hendleDeleteProduct = (pid) => {
    Swal.fire({
      title: 'Bạn chắc chắn chứ?',
      text: 'Bạn muốn xóa sản phẩm?',
      icon: 'warning',
      showCancelButton: true
    }).then(async(rs) => {
      if(rs.isConfirmed) {
        const response = await apiDeleteProduct(pid)
        if (response.success) toast.success(response.mes)
          else toast.error(response.mes)
        render()
      }
    })
  }
  return (
    <div className='w-full pl-2 flex flex-col gap-4 relative'>
      {editProduct && <div className='absolute inset-0 bg-white min-h-max z-50'>
        <UpdateProduct 
        editProduct={editProduct} 
        render={render}
        setEditProduct={setEditProduct}
        />
      </div>}
      <div className='h-[69px] w-full'></div>
      <div className='p-4 border-b border-b-blue-400 w-full bg-white flex justify-between items-center fixed top-0'>
      <h1 className='text-3xl font-bold tracking-tight'>Quản lý sản phẩm</h1>
      </div>
      <div className='flex justify-end items-center px-4'>
        <form className='w-[45%]'>
          <InputForm
          id='q'
          register={register}
          errors={errors}
          fullWidth
          placeholder='Tìm kiếm sản phẩm'
          />
        </form>
      </div>
      <table className='table-auto'>
          <thead>
          <tr className='border bg-white w-full border=white'>
            <th className='text-center py-2'>STT</th>
            <th className='text-center py-2'>Ảnh bìa</th>
            <th className='text-center py-2'>Tên sản phẩm</th>
            <th className='text-center py-2'>Danh mục</th>
            <th className='text-center py-2'>Danh mục nhỏ</th>
            <th className='text-center py-2'>Giá</th>
            <th className='text-center py-2'>Giảm giá</th>
            <th className='text-center py-2'>Số lượng</th>
            <th className='text-center py-2'>Sản phẩm đã bán</th>
            <th className='text-center py-2'>Loại</th>
            <th className='text-center py-2'>Số lượt đánh giá</th>
            <th className='text-center py-2'>Ngày tạo</th>
            <th className='text-center py-2'>Hành động</th>
          </tr>
          </thead>
          <tbody>
            {products?.map((el, idx) => (
              <tr className='border-b' key={el._id}>
                <td className='text-center py-2'>{((+params.get('page')>1 ? +params.get('page')-1 : 0) * process.env.REACT_APP_PRODUCT_LIMIT) + idx + 1}</td>
                <td className='text-center py-2'>
                  <img src={el.thumb} alt="thumb" className='w-12 h-12 object-cover'/>
                </td>
                <td className='text-center py-2'>{el.title}</td>
                <td className='text-center py-2'>{el.category}</td>
                <td className='text-center py-2'>{el.subcategory}</td>
                <td className='text-center py-2'>{el.price.toLocaleString()}</td>
                <td className='text-center py-2'>{el.discount}%</td>
                <td className='text-center py-2'>{el.quantity}</td>
                <td className='text-center py-2'>{el.sold}</td>
                <td className='text-center py-2'>{el.subcategories}</td>
                <td className='text-center py-2'>{el.totalRatings}</td>
                <td className='text-center py-2'>{moment(el.updateAt).format('DD/MM/YYYY')}</td>
                <td className='text-center py-2'>
                  <div className='flex justify-center items-center'>
                  <span onClick={() => setEditProduct(el)} className='text-blue-500 inline-block hover:underline hover:text-orange-500 cursor-pointer px-1'><FaEdit size={20}/></span>
                  <span onClick={() => hendleDeleteProduct(el._id)} className='text-blue-500 inline-block hover:underline hover:text-orange-500 cursor-pointer px-1'><IoTrashBin size={20}/></span>
                  </div>
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

export default ManageProducts
