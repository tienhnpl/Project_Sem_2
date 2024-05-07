import React, { memo } from 'react';
import usePagination from '../../hooks/usePagination';
import PagiItem from './PagiItem';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  const page = +params.get('page') || 1;
  const pagination = usePagination(totalCount, page);
  const pageSize = +process.env.REACT_APP_PRODUCT_LIMIT || 10;

  const start = Math.min(((page -1) * pageSize)+1, totalCount)
  const end = Math.min(page * pageSize, totalCount);

  const displayInfo = (!+params.get('page')) 
    ? `Hiển thị sản phẩm ${Math.min(totalCount, 1)} - ${Math.min(pageSize, totalCount)} của ${totalCount}`
    : `Hiển thị sản phẩm ${start} - ${end} của ${totalCount}`;

  return (
    <div className='flex justify-between items-center gap-4'>
      <span className='text-sm italic'>{displayInfo}</span>
      <div className='flex items-center'>
        {pagination?.map((el) => (
          <PagiItem key={el}>{el}</PagiItem>
        ))}
      </div>
    </div>
  );
};

export default memo(Pagination);
