// import React, {useEffect, useState, useCallback} from 'react'
// import { useParams, useSearchParams } from 'react-router-dom'
// import {Breadcrumbs,Card,Pagination,SearchItem} from '../../components/index'
// import { getProducts } from '../../apis'
// import Masonry from 'react-masonry-css'
// import {renderStarFromNumber} from '../../utils/helpers'
// import { Link } from 'react-router-dom'
// import { queries } from '@testing-library/react'

// const breakpointColumnsObj = {
//     default: 4,
//     1100: 3,
//     700: 2,
//     500: 1
//   };

// const Products = () => {
//     const [products,setProducts] = useState(null)
//     const [activeClick,setActiveClick] = useState(null)
//     const [params] = useSearchParams()

//     const fetchProductByCategory = async (queries) => {
//         const response = await getProducts(queries)
//         if (response.success) setProducts(response)
//           console.log(response);
//     }

//     const formatCategory = (category) => {
//       return category.replace(/-/g, ' '); // Thay thế tất cả các dấu gạch ngang bằng dấu cách
//     };

//     const {category} = useParams()
//     useEffect(() => {
//       const queries = Object.fromEntries([...params])
//       let priceQuery = {}
//         if (queries.to && queries.from) {
//             priceQuery = {
//             $and: [
//                 {price: {gte: queries.from}},
//                 {price: {lte: queries.to}},

//             ]}
//         delete queries.price

//         }else {
//           if (queries.from) queries.price = {gte: queries.from}
//           if (queries.to) queries.price = {lte: queries.to}
//         }
        
//         delete queries.to
//         delete queries.from
//         const q = {...priceQuery, ...queries}
//         fetchProductByCategory(q)
//     },[params])
//     const changeActiveFilter = useCallback ((name) => {
//         if (activeClick === name) setActiveClick(null)
//         else setActiveClick(name)
//     }, [activeClick])
//     // const changeValue = useCallback((value) => {
//     //     setSort(value)
//     // },[sort])
//   return (
//     <div>
//       <div className='w-full px-12'>
//       <h3>{category}</h3>
//       <Breadcrumbs category={formatCategory(category)} />
      
//       </div>
//       <div className='w-full bordder p-4 flex justify-center'>
//         <div className='w-4/5 flex-auto pl-10 flex-col flex gap-3'>
//             <span className='font-extrabold text-sm'>Tìm theo</span>
//             <div className='flex items-center gap-4'>
//             <SearchItem
//             name='GIÁ'
//             activeClick={activeClick}
//             changeActiveFilter={changeActiveFilter}
//             type='input'
//             />
//             <SearchItem
//             name='LOẠI'
//             activeClick={activeClick}
//             changeActiveFilter={changeActiveFilter}
//             />
//             </div>
//         </div>
//       </div>
//       <div className='grid mb-80 grid-cols-4 gap-x-10 gap-y-[50px] pl-10'>
//       {/* <Masonry
//         breakpointCols={breakpointColumnsObj}
//         className="my-masonry-grid flex mx-[-10px] grid-cols-4 gap-x-10 gap-y-[50px]"
//         columnClassName="my-masonry-grid_column"> */}
//            {products?.products?.map(el => <Link 
//     key={el.id}
//     to={`/${el.category}/${el.subcategories}/${el._id}/${el.title}`} // Sử dụng trực tiếp giá trị từ đối tượng el
//   >
//     <Card
//       key={el._id}
//       image={el.images[0]}
//       title={el.title}
//       star={renderStarFromNumber(el.totalRatings)}
//       sold={el.sold}
//       discount={el.discount}
//       price={el.price}
//     />
//   </Link>)} 
//             {/* </Masonry> */}
//       </div>
//       <div className='m-auto flex justify-center'>
//         <Pagination 
//         totalCount={products?.counts}
//         />
//       </div>
//     </div>
//   )
// }

// export default Products


import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Breadcrumbs, Card, Pagination, SearchItem } from '../../components/index'
import { getProducts } from '../../apis'
import Masonry from 'react-masonry-css'
import { renderStarFromNumber } from '../../utils/helpers'
import { Link, useNavigate } from 'react-router-dom'

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Products = ({productData}) => {
  const [products, setProducts] = useState(null)
  const [activeClick, setActiveClick] = useState(null)
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const fetchProductByCategory = async (category, queries) => {
    const response = await getProducts({ ...queries, category }) // Thêm category vào queries
    if (response.success) setProducts(response)
    console.log(response);
  }

  const formatCategory = (category) => {
    return category.replace(/-/g, ' '); // Thay thế tất cả các dấu gạch ngang bằng dấu cách
  };

  const { category } = useParams()
  useEffect(() => {
    const queries = Object.fromEntries([...params])
    let priceQuery = {}
    if (queries.to && queries.from) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },

        ]
      }
      delete queries.price

    } else {
      if (queries.from) queries.price = { gte: queries.from }
      if (queries.to) queries.price = { lte: queries.to }
    }

    delete queries.to
    delete queries.from
    const q = { ...priceQuery, ...queries }
    fetchProductByCategory(category, q) // Truyền category vào hàm fetchProductByCategory
  }, [category, params]) // Thêm category vào dependencies để useEffect chạy lại khi category thay đổi
  const changeActiveFilter = useCallback((name) => {
    if (activeClick === name) setActiveClick(null)
    else setActiveClick(name)
  }, [activeClick])

  return (
    <div>
      <div className='w-full px-12'>
        <h3>{category}</h3>
        <Breadcrumbs category={formatCategory(category)} />

      </div>
      <div className='w-full bordder p-4 flex justify-center'>
        <div className='w-4/5 flex-auto pl-10 flex-col flex gap-3'>
          <span className='font-extrabold text-sm'>Tìm theo</span>
          <div className='flex items-center gap-4'>
            <SearchItem
              name='GIÁ'
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
              type='input'
            />
            <SearchItem
              name='LOẠI'
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
            />
          </div>
        </div>
      </div>
      <div className='grid mb-80 grid-cols-4 gap-x-10 gap-y-[50px] pl-10'>
        {products?.products?.map(el => <div
          key={el.id}
          onClick={(e) => {
            if (el.subcategories && el.subcategories.length > 0) {
              navigate(`/${el.category?.toLowerCase()}/${el.subcategories[0]}/${el._id}/${el.title}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              console.error('Subcategories are undefined or empty.');
            }
          }}
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
        </div>)}
      </div>
      <div className='m-auto flex justify-center'>
        <Pagination
          totalCount={products?.counts}
        />
      </div>
    </div>
  )
}

export default Products


