import React, { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiGetProduct,apiUpdateCart,getProducts } from '../../apis';
import {Breadcrumbs, Button,SelectQuantity,ProductInformation,Card } from '../../components/index';
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import {formatMoney, formatPrice, renderStarFromNumber} from '../../utils/helpers'
import { Link } from 'react-router-dom';
import path from "../../utils/path";
import { FaHome } from "react-icons/fa";
import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent } from 'store/user/asyncAction';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';



const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
}

const DetailProduct = () => {
  const { category, subcategories, pid, title } = useParams(); // Thêm subCategory vào
  const [product, setProduct] = useState(null);
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {current} = useSelector(state => state.user)
  const [currentImage, setCurrentImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [update, setUpdate] = useState(false);
  let newPrice = product?.price - (product?.price / 100) * product?.discount;
  // const [currentProduct, setCurrentProduct] = useState({
  //   title: '',

  // })

  const fetchProductData = async () => {
    // try {
      const response = await apiGetProduct(pid);
      if (response.success) {
        setProduct(response.productData)
        setCurrentImage(response.productData?.thumb)
      }
    //   setProduct(response.data); // Giả sử response trả về dữ liệu sản phẩm trong response.data
    // } catch (error) {
    //   console.error('Error fetching product data:', error);
    // }
  };

  const fetchProducts = async() => {
    const response = await getProducts({category});
      if (response.success) setRelatedProducts(response.products)
        console.log(response.products);
  }
  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts()
    }
  }, [pid]);

  useEffect(() => {
    if (pid) {
      fetchProductData();
    }
  }, [update]);

  const rerender = useCallback(() => {
    setUpdate(!update)
  },[update])

  const handleQuantity = useCallback((number) => {
    if(!Number(number) || Number(number) < 1) {
      return
  }else {
    setQuantity(number)
  }

  },[quantity])
  const handleChangeQuantity = useCallback((flag) => {
    if (flag === 'minus' && quantity === 1) return
    if (flag === 'minus') setQuantity(prev => +prev -1)
    if (flag === 'plus') setQuantity(prev => +prev +1)
  },[quantity])
const handleClickImage = (e,el) => {
  e.stopPropagation();
  setCurrentImage(el)
}

const handdleAdddToCart = async () => {
  if (!current) return Swal.fire({
    title: 'Chưa đăng nhập',
    text: 'Hãy đăng nhập để mua hàng',
    icon: 'info',
    cancelButtonText: 'Trở lại',
    showCancelButton: true,
    confirmButtonText: 'Đi tới trang đăng nhập'

  }).then((rs) => {
    if (rs.isConfirmed) navigate({
        pathname: `/${path.LOGIN}`,
        search: createSearchParams({redirect: location.pathname}).toString()
    })
  })
    // console.log(productData);
    const response = await apiUpdateCart({pid, subcategory: product?.subcategory, quantity, title: product?.title})
    // console.log(productData.subcategory);
    if (response.success) {
      toast?.success(response?.mes)
      dispatch(getCurrent());
    }
      else toast?.error(response?.mes)
}

const handleBuyNow = async () => {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!current) {
    // Nếu chưa đăng nhập, hiển thị thông báo yêu cầu đăng nhập
    return Swal.fire({
      title: 'Chưa đăng nhập',
      text: 'Hãy đăng nhập để mua hàng',
      icon: 'info',
      cancelButtonText: 'Trở lại',
      showCancelButton: true,
      confirmButtonText: 'Đi tới trang đăng nhập'
    }).then((rs) => {
      if (rs.isConfirmed) {
        // Nếu người dùng xác nhận, chuyển hướng đến trang đăng nhập và lưu lại đường dẫn trang hiện tại
        navigate({
          pathname: `/${path.LOGIN}`,
          search: createSearchParams({ redirect: location.pathname }).toString()
        })
      }
    });
  } else {
    // Nếu đã đăng nhập, thực hiện các bước để thêm sản phẩm vào giỏ hàng và chuyển hướng đến trang thanh toán
    const response = await apiUpdateCart({ pid, subcategory: product?.subcategory, quantity, title: product?.title });
    if (response.success) {
      // Nếu thêm vào giỏ hàng thành công, hiển thị thông báo và cập nhật thông tin người dùng
      dispatch(getCurrent());
      // Chuyển hướng đến trang thanh toán
      navigate(`/${path.MEMBER}/${path.DETAIL_CART}`);
    } else {
      // Nếu có lỗi xảy ra khi thêm vào giỏ hàng, hiển thị thông báo lỗi
      toast?.error(response?.mes);
    }
  }
};
  return (
    <div className="pl-7">
      <h3>{title}</h3>
      <Breadcrumbs category={product?.category} subcategories={product?.subcategories.join(', ')} title={title}/>

      {/* Truyền category, subCategory và title vào component Breadcrumbs */}
      <div className='m-auto mt-4 flex pl-40'>
        <div className=' flex flex-col gap-4 w-2/5'>
          <div className='h-[458px] w-[458px] '>
          <ReactImageMagnify {...{
            smallImage: {
            alt: 'Wristwatch by Ted Baker London',
            isFluidWidth: true,
            src: currentImage
            },
            largeImage: {
            src: currentImage,
            width: 1800,
            height: 1800
            }
            }} />
          </div>
          <div className='w-[458px]'>
            <Slider {...settings}>
              {product?.images?.map(el => (
                <div className='flex w-full gap-2' key={el}>
                  <img onClick={e => handleClickImage(e, el)} src={el} alt='sub-product' className='cursor-pointer h-[143] w-[143px] object-cover border'/>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className='w-2/5 pr-[24px] flex flex-col gap-4'>
          <h2 className='font-extrabold text-[25px]'>{`${product?.title}`}</h2>
          <div className='flex items-center gap-4'>
            <div className=''>Giá gốc :</div>
          <h3 className='text-[#2E2437] text-[24px] font-extrabold'>{`${formatMoney(formatPrice(product?.price))} VNĐ`}</h3>

          </div>
          <div className='flex items-center gap-4'>
          <div className=''>Giảm giá :</div>
          <p className="text-[#DF0000] text-[24px]">-{product?.discount}%</p>
          </div>
          <div className='flex items-center gap-4'>
          <div className=''>Giá mới :</div>
          <p className="text-[#2E2437] text-[24px] font-extrabold">
          {newPrice.toLocaleString()} <span>VNĐ</span>
        </p>
          </div>
          <div className='flex items-center gap-1'>
            {renderStarFromNumber(product?.totalRatings)?.map((el,index) => (<span key={index}>{el}</span>))}
            <span className='text-sm text-[#DF0000] italic'>{`(Đã bán: ${product?.sold} sản phẩm)`}</span>
          </div>
          <ul className='list-square text-sm text-gray-500 pl-4'>
            {product?.description?.length > 1 && product?.description?.map(el => (<li className='leading-6' key={el}>{el}</li>))}
            {product?.description?.length === 1 && <div className='text-sm line-clamp-[10] mb-8' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product?.description[0])}}></div>}
          </ul>
          <div className='flex flex-col gap-8'>
            <div className='flex items-center gap-1'>
            <div className='font-semibold text-[20px]'>Số lượng :</div>
            <SelectQuantity 
            quantity={quantity} 
            handleQuantity={handleQuantity}
            handleChangeQuantity={handleChangeQuantity}
            />
            <span className='text-sm text-[#DF0000] italic'>{`(Tồn kho: ${product?.quantity} sản phẩm)`}</span>

            </div>
            <Button fw handdleOnClick={handdleAdddToCart}>
              Thêm vào giỏ hàng
            </Button>

            <Button fw handdleOnClick={handleBuyNow}>
              Mua ngay
            </Button>
              <Link className='flex items-center gap-2 hover:text-bg-user text-[20px]' to={`${path.Home}`}>Trở về trang chủ <FaHome/></Link>
          </div>
        </div>
        <div className='w-1/5'>
          <div className='w-[90px] h-[40px] rounded bg-[#AC8EE3] flex items-center justify-center text-white font-semibold'>
            <span className=''>Bán chạy</span>
          </div>
        </div>
      </div>
      <div className='pl-40 flex flex-col px-4 mt-20'>
          <ProductInformation 
          totalRatings={product?.totalRatings} 
          ratings={product?.ratings}
          nameProduct={product?.title}
          pid={product?._id}
          rerender={rerender}
          />
        </div>
        <div className='flex flex-col px-4 mt-20 font-extrabold text-[20px]'>
          SẢN PHẨM LIÊN QUAN
        </div>
        <div className="grid grid-cols-4 mt-20 gap-x-10 gap-y-[50px]">
        {relatedProducts && relatedProducts.map(el => (
    <Link 
    key={el.id}
    to={`/${el.category}/${el.subcategories[0]}/${el._id}/${el.title}`}
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Sử dụng trực tiếp giá trị từ đối tượng el
  >
    <Card
      key={el.id}
      productData={el}
      // image={el.thumb}
      // title={el.title}
      // star={renderStarFromNumber(el.totalRatings)}
      // sold={el.sold}
      // discount={el.discount}
      // price={el.price}
    />
  </Link>
))}
        </div>
    </div>
  );
};

export default DetailProduct;