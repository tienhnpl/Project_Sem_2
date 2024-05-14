import React, { useCallback, useEffect, useState } from 'react'
import { InputForm,Select, Button, MarkdownEditor, Loading } from 'components';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { validate, getBase64 } from 'utils/helpers';
import { toast } from 'react-toastify';
import { apiCreateProduct } from 'apis';
import { showModal } from 'store/reducers/appSlice';
import  {subcategories}  from 'utils/contantsDetail';


const CreateProducts = () => {
  const { categories } = useSelector(state => state.categories);
  const dispatch = useDispatch()
  const {register, formState: {errors}, reset, handleSubmit, watch} = useForm()
  
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
  const [invalidFields, setInvalidFields] = useState([])
  const changeValue = useCallback((e) => {
      setPayload(e)
  },[payload])

  const [hoverElm, setHoverElm] = useState(null)

  const handleReviewThumb = async(file) => {
    const base64Thumb = await getBase64(file)
    setreview(prev => ({...prev, thumb: base64Thumb}))
  }
  const handleReviewImages = async(files) => {
    const imagesReview = []
    for(let file of files) {
      if (file.type !== 'image/png' && file.type !== 'image/jpeg'){
        toast.warning('Định dạng file không hổ trợ')
          return
      }
        const base64 = await getBase64(file)
        imagesReview.push({ name: file.name, path: base64})
      
    }
  setreview(prev => ({...prev, images: imagesReview}))
  }
  useEffect(() => {
    handleReviewThumb(watch('thumb')[0])

  },[watch('thumb')])

  useEffect(() => {
    handleReviewImages(watch('images'))

  },[watch('images')])
  const handleCreateProduct = async (data) => {
    const invalids = validate(payload, setInvalidFields)
    if (invalids === 0) {
      const quantity = parseInt(data.quantity, 10);
      if (quantity < 0 || isNaN(quantity)) {
        toast.error('Số lượng sản phẩm không hợp lệ');
        return;
      }
  
      if (data.category) data.category = categories?.find(el => el?._id === data.category)?.title
      const finalPayload = { ...data, ...payload };
      const formData = new FormData()
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
      if (finalPayload.thumb) formData.append('thumb', finalPayload.thumb[0])
      if (finalPayload.images) {
        for (let image of finalPayload.images) formData.append('images', image)
      }
      dispatch(showModal(true, <Loading/>))
      const response = await apiCreateProduct(formData)
      dispatch(showModal(false, null))
      
      if (response.success) { // Chỉnh lại từ response.success
        toast.success(response.mes) // Chỉnh lại từ response.message
        reset()
        setPayload({
          thumb: '',
          image: []
        })
      } else {
        toast.error(response.mes) // Chỉnh lại từ response.message
      }
      
      console.log(response);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ',' + pair[1]);
    // }
    }
  }

  return (
    <div className='w-full'>
      <h1 className='h-[75px] bg-white flex justify-between items-center text-3xl font-bold px-4 border-b border-b-blue-400'>
        <span>Tạo sản phẩm mới</span>
      </h1>
      <div className='p-4 '>
        <form onSubmit={handleSubmit(handleCreateProduct)}>
        <InputForm
  label={
    <>
      <span>Tên Sản Phẩm </span>
      <span className="text-xs text-red-500">*</span>
    </>
  }
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
            options={categories?.map(el => ({code: el._id, value: el.title}))}
            register={register}
            id='category'
            validate={{required: 'Hãy điền đủ thông tin'}}
            style='flex-auto'
            errors={errors}
            fullWidth
            />
            <Select
            label='Subcategories'
            options={categories?.find(el => el._id === watch('category'))?.subcategory?.map(el => ({code: el, value: el}))}
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
          {/* <InputForm
          label='Danh mục SP phụ'
          register={register}
          errors={errors}
          id='subcategories'
          validate={{
            required: 'Hãy điền đủ thông tin'
          }}
          style='flex-auto'
          placeholder='Danh mục SP phụ'
          /> */}
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
          />
          <div className='flex flex-col gap-2 mt-8'>
            <label className='font-semibold' for="thumb">Tải lên ảnh bìa</label>
            <input  
            type="file" 
            id='thumb'
            {...register('thumb', {required: 'Hãy nhập vào đây'})}
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
            {...register('images', {required: 'Hãy nhập vào đây'})}
             />
             {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
          </div>
          {review.images.length > 0 && <div className='flex w-full gap-3 flex-wrap my-4'>
            {review.images?.map((el, idx) => (
              <div 
              onMouseEnter={() => setHoverElm(el.name)} 
              key={idx} 
              className='w-fit relative'
              onMouseLeave={() => setHoverElm(null)}
              >
                <img src={el.path} alt="product" className='w-[200px] object-contain'/>
                {/* {hoverElm === el.name && <div 
                className='absolute cursor-pointer animate-scale-up-center inset-0 bg-overlay flex items-center justify-center'
                onClick={() => handleRemoveImage(el.name)}
                >
                  <IoTrashBin size={24} color='white'/>
                  </div>} */}
                  
              </div>
            ))}
          </div>}
          <div className='mt-6'><Button style={'bg-blue-500 w-[200px] h-[30px] rounded-md text-white'} type='submit'>Thêm mới</Button></div>
        </form>
      </div>
    </div>
  )
}

export default CreateProducts
