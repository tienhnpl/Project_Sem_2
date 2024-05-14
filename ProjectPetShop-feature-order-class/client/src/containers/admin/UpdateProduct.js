import { InputForm, MarkdownEditor, Select, Button, Loading } from 'components';
import React, { memo, useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form';
import { validate, getBase64 } from 'utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { apiUpdateProduct} from 'apis';
import { showModal } from 'store/reducers/appSlice';
import  {subcategories}  from 'utils/contantsDetail';


const UpdateProduct = ({editProduct, render, setEditProduct}) => {
    const { categories } = useSelector(state => state.categories);
  const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}, reset, watch} = useForm()
    const [payload, setPayload] = useState({
        description: ''
      })
      const [review, setreview] = useState({
        thumb: null,
        images: []
      })

      const handleInput = (e) => {
        let value = parseInt(e.target.value, 10);
        if (value < 0 || isNaN(value)) {
          e.target.value = 0; // Adjust negative or invalid values to 0
        }
      };  
      useEffect(() => {
        reset({
            title: editProduct?.title || '',
            price: editProduct?.price || '',
            quantity: editProduct?.quantity || '',
            subcategories: editProduct?.subcategories || '',
            category: editProduct?.category || '',
            subcategory: editProduct?.subcategory?.toLowerCase() || '',
            
        })
        setPayload({description: typeof editProduct?.description === 'object' ? editProduct?.description?.join(',') : editProduct?.description})
        setreview({
            thumb: editProduct?.thumb || '',
            images: editProduct?.images || []
        })
      },[editProduct])
    //   console.log(categories);
      const [invalidFields, setInvalidFields] = useState([])
      const changeValue = useCallback((e) => {
          setPayload(e)
      },[payload])
      
      const handleReviewThumb = async(file) => {
        const base64Thumb = await getBase64(file)
        setreview(prev => ({...prev, thumb: base64Thumb}))
      }

    //   const handleReviewImages = async(files) => {
    //     if (!Array.isArray(files)) {
    //         console.error('Files is not an array:', files);
    //         return;
    //     }
        
    //     const imagesReview = [];
    //     for (let file of files) {
    //         if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
    //             toast.warning('Định dạng file không được hỗ trợ');
    //             return;
    //         }
    //         const base64 = await getBase64(file);
    //         imagesReview.push({ name: file.name, path: base64 });
    //     }
    //     setreview(prev => ({ ...prev, images: imagesReview }));
        
    // }
      const handleReviewImages = async(files) => {
        const imagesReview = []
        for(let file of files) {
          if (file.type !== 'image/png' && file.type !== 'image/jpeg'){
            toast.warning('Định dạng file không hổ trợ')
              return
          }
            const base64 = await getBase64(file)
            imagesReview.push(base64)
          
        }
      setreview(prev => ({...prev, images: imagesReview}))
      }
      useEffect(() => {
        if (watch('thumb') instanceof FileList && watch('thumb').length > 0)
        handleReviewThumb(watch('thumb')[0])

      },[watch('thumb')])
    
      useEffect(() => {
        if (watch('images') instanceof FileList && watch('images').length > 0)
            handleReviewImages(watch('images'))
    
      },[watch('images')])

      const handleUpdateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0){
          if (data.category) data.category = categories?.find(el => el?.title === data?.category)?.title
          const finalPayload = {...data, ...payload}
          finalPayload.thumb = data?.thumb?.length === 0 ? review?.thumb : data.thumb[0]
        const formData = new FormData()
        for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
        finalPayload.images = data.images?.length === 0 ? review?.images : data.images  
        for (let image of finalPayload.images) formData.append('images', image)
        dispatch(showModal(true, <Loading/>))
        const response = await apiUpdateProduct(formData, editProduct._id)
        dispatch(showModal(false, null))

        if (response.success) {
        toast.success(response.mes)
          render()
          setEditProduct(null)
          }else toast.error(response.mes)
        }
      }
  return (
    <div className='w-full pl-10 flex flex-col gap-4 relative'>
      <div className='h-[69px] w-full '></div>
      <div className='p-4 border-b border-b-blue-400 bg-white flex justify-between right-0 left-[327px] items-center fixed top-0'>
      <h1 className='text-3xl font-bold tracking-tight'>Cập nhật sản phẩm</h1>
      <span className='text-red-500 hover:underline cursor-pointer' onClick={() => setEditProduct(null)}>Trở lại</span>
      </div>
      <div className='p-4'>
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputForm
          label='Tên Sản Phẩm'
          register={register}
          errors={errors}
          id='title'
          validate={{
            required: 'Hãy điền đủ thông tin'
          }}
          fullWidth
          placeholder='Tên sản phẩm'
          />
           <div className='w-full my-6 flex gap-4'>
            <Select
            label='Danh Mục'
            options={categories?.map(el => ({code: el.title, value: el.title}))}
            register={register}
            id='category'
            validate={{required: 'Hãy điền đủ thông tin'}}
            style='flex-auto'
            errors={errors}
            fullWidth
            />
            <Select
            label='Subcategories'
            options={categories?.find(el => el.title === watch('category'))?.subcategory?.map(el => ({code: el.toLowerCase(), value: el}))}
            register={register}
            id='subcategory'
            validate={{required: 'Hãy điền đủ thông tin'}}
            style='flex-auto'
            errors={errors}
            fullWidth
            />
          </div>
          <div className='w-full my-6 flex gap-4'>
          <InputForm
          label='Giá'
          register={register}
          errors={errors}
          id='price'
          validate={{
            required: 'Hãy điền đủ thông tin'
          }}
          style='flex-auto'
          placeholder='Giá của sản phẩm'
          type='number'
          />
          <InputForm
          label='Giảm giá %'
          register={register}
          errors={errors}
          id='discount'
          style='flex-auto'
          placeholder='Ví dụ 1 tương đương 1%'
          type='number'
          />
          <InputForm
        label='Số Lượng'
        register={register}
        errors={errors}
        id='quantity'
        defaultValue={1}
        min={1} // Đặt giá trị tối thiểu là 0
        onInput={handleInput} // Sử dụng hàm xử lý sự kiện handleInput
        validate={{
          required: 'Hãy điền đủ thông tin',
        }}
        style='flex-auto'
        placeholder='Số lượng sản phẩm'
        type='number'
      />
          <Select
          label='Danh mục SP phụ'
          options={subcategories?.map(category => ({ code: category, value: category }))}
          register={register}
          id='subcategories'
          validate={{ required: 'Hãy điền đủ thông tin' }}
          style='flex-auto'
          fullWidth
          errors={errors}
        />
          </div>
         
          <MarkdownEditor
          name='description'
          changeValue={changeValue}
          label='Mô Tả'
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          value={payload.description}
          
          />
          <div className='flex flex-col gap-2 mt-8'>
            <label className='font-semibold' for="thumb">Tải lên ảnh bìa</label>
            <input  
            type="file" 
            id='thumb'
            {...register('thumb')}
            />
       {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}

          </div>
          {review.thumb && <div className='my-4'>
            <img src={review.thumb} alt="thumbnail" className='w-[200px] object-contain'/>
          </div>}
          <div className='flex flex-col gap-2 mt-8'>
            <label className='font-semibold' for="products">Tải lên hình ảnh sản phẩm</label>
            <input 
            type="file" 
            id='products'
             multiple
            {...register('images')}
             />
             {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
          </div>
          {review.images.length > 0 && <div className='flex w-full gap-3 flex-wrap my-4'>
            {review.images?.map((el, idx) => (
              <div 
              key={idx} 
              className='w-fit relative'
              >
                <img src={el} alt="product" className='w-[200px] object-contain'/>
                {/* {hoverElm === el.name && <div 
                className='absolute cursor-pointer animate-scale-up-center inset-0 bg-overlay flex items-center justify-center'
                onClick={() => handleRemoveImage(el.name)}
                >
                  <IoTrashBin size={24} color='white'/>
                  </div>} */}
                  
              </div>
            ))}
          </div>}
          <div className='mt-6'><Button style={'bg-blue-500 w-[200px] h-[30px] rounded-md text-white'} type='submit'>Cập nhật</Button></div>
        </form>
      </div>
    </div>
  )
}

export default memo(UpdateProduct)
