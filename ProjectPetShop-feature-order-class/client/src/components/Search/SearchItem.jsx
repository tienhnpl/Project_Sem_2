import React, { memo, useEffect, useState } from 'react';
import icons from 'utils/icons';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { subcategories } from 'utils/contantsDetail'; // Import danh sách các subcategory từ file constantsDetail trong thư mục utils
import { getProducts,apiGetCategories } from 'apis'; // Import hàm lấy sản phẩm từ API
import useDebounce from 'hooks/useDebounce'; // Import hook để giảm tải việc gọi API

const { IoChevronDown } = icons;

const SearchItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox' }) => {
    const navigate = useNavigate();
    const { category } = useParams();
    const [selected, setSelected] = useState([]); // State để lưu trữ các subcategory đã được chọn
    const [params] = useSearchParams(); // State để trích xuất các tham số trên URL
    const [price, setPrice] = useState({ from: '', to: '' }); // State để lưu trữ giá từ và đến để lọc sản phẩm
    const [bestPrice, setBestPrice] = useState(null); // State để lưu trữ giá cao nhất của sản phẩm


    // const Categories = () => {
        // const [categories, setCategories] = useState(null);
      
        // const fetchCategories = async () => {
        //   try {
        //     const response = await apiGetCategories();
        //     if (response.success) {
        //       const extractedSubcategories = response.productCategories.map(
        //         (category) => category.subcategory
        //       );
        //       setCategories(extractedSubcategories[]);
        //       console.log(extractedSubcategories);
        //     }
        //   } catch (error) {
        //     console.error("Error fetching categories:", error);
        //   }
        // };

        
      
        // useEffect(() => {
        //   fetchCategories();
        // }, []);
    
    // Xử lý sự kiện khi người dùng chọn hoặc bỏ chọn một subcategory
    const handleSelect = (e) => {
        const alreadyEl = selected.find(el => el === e.target.value);
        if (alreadyEl) setSelected(prev => prev.filter(el => el !== e.target.value));
        else setSelected(prev => [...prev, e.target.value]);
        changeActiveFilter(null);
    };

    // Gọi API để lấy giá cao nhất của sản phẩm
    const fetchBestPriceProduct = async () => {
        const response = await getProducts({ sort: '-price', limit: 1 });
        if (response.success) setBestPrice(response.products[0]?.price);
    };

    // Hook để giảm tải việc gọi API khi giá từ và giá đến thay đổi
    const deboucePriceFrom = useDebounce(price.from, 500);
    const deboucePriceTo = useDebounce(price.to, 500);

    // Effect để điều hướng khi selected thay đổi
    useEffect(() => {
        let param = [];
        for (let i of params.entries()) param.push(i);
        const queries = {};
        for (let i of param) queries[i[0]] = i[1];
        if (selected.length > 0) {
            if (selected) queries.subcategories = selected.join(',');
            queries.page = 1;
        } else delete queries.subcategories;
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString()
        });
    }, [selected]);

    // Effect để gọi fetchBestPriceProduct khi type thay đổi
    useEffect(() => {
        if (type === 'input') fetchBestPriceProduct();
    }, [type]);

    // Effect để hiển thị cảnh báo khi giá nhập vào không hợp lệ
    useEffect(() => {
        if (price.from && price.to && price.from > price.to) alert('Giá nhập vào không thể lớn hơn giá cuối');
    }, [price]);

    // Effect để điều hướng khi giá từ và giá đến thay đổi
    useEffect(() => {
        let param = [];
        for (let i of params.entries()) param.push(i);
        const queries = {};
        for (let i of param) queries[i[0]] = i[1];
        if (Number(price.from) > 0) queries.from = price.from;
        else delete queries.from;
        if (Number(price.to) > 0) queries.to = price.to;
        else delete queries.to;
        queries.page = 1;
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString()
        });
    }, [deboucePriceFrom, deboucePriceTo]);

    // Phần giao diện
    return (
        <div
            className='p-4 cursor-pointer text-gray-500 text-xs gap-6 relative border border-gray-800 flex justify-between items-center'
            onClick={() => changeActiveFilter(name)}
        >
            <span className='capitalize'>{name}</span>
            <IoChevronDown />
            {activeClick === name && <div className='absolute z-10 top-[calc(100%+1px)] left-0 p-4 w-fit border bg-white min-w-[200px]'>
                {type === 'checkbox' && <div className=''>
                    <div className='p-4 items-center flex justify-between gap-8 border-b'>
                        <span className='whitespace-nowrap'>{`${selected.length} Đã chọn`}</span>
                        <span onClick={e => {
                            e.stopPropagation();
                            setSelected([]);
                            changeActiveFilter(null);
                        }} className='underline cursor-pointer hover:text-bg-user'>Reset</span>
                    </div>
                    <div onClick={e => e.stopPropagation()} className='flex flex-col gap-3 mt-4'>
                        {/* Lặp qua danh sách các subcategory và hiển thị chúng dưới dạng checkbox */}
                        {subcategories?.map((el, index) => (
                            <div key={index} className='flex items-center gap-5'>
                                <input
                                    type="checkbox"
                                    name={el}
                                    onChange={handleSelect}
                                    value={el}
                                    id={el}
                                    checked={selected.some(selectedItem => selectedItem === el)}
                                    className='form-checkbok'
                                />
                                <label className='capitalize text-gray-700' htmlFor={el}>{el}</label>
                            </div>
                        ))}
                    </div>
                </div>}
                {type === 'input' && <div onClick={e => e.stopPropagation()}>
                    <div className='p-4 items-center flex justify-between gap-8 border-b'>
                        <span className='whitespace-nowrap'>{`Giá cao nhất ${Number(bestPrice).toLocaleString()} VNĐ`}</span>
                        <span onClick={e => {
                            e.stopPropagation();
                            setPrice({ from: '', to: '' });
                            changeActiveFilter(null);
                        }} className='underline cursor-pointer hover:text-bg-user'>Reset</span>
                    </div>
                    <div className='flex items-center p-2 gap-2'>
                        <div className='flex items-center gap-2'>
                            <label htmlFor="from">Từ</label>
                            <input
                                className='form-input'
                                type="number"
                                id='from'
                                value={price.from}
                                onChange={e => setPrice(prev => ({ ...prev, from: e.target.value }))}
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <label htmlFor="to">Đến</label>
                            <input
                                className='form-input'
                                type="number"
                                id='to'
                                value={price.to}
                                onChange={e => setPrice(prev => ({ ...prev, to: e.target.value }))}
                            />
                        </div>
                    </div>
                </div>}
            </div>}
        </div>
    );
};

export default memo(SearchItem);




