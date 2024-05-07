import React, { memo } from 'react'
import clsx from 'clsx'
import { useSearchParams, useNavigate, createSearchParams, useLocation } from 'react-router-dom'


const PagiItem = ({children}) => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const location = useLocation()
  
  const handlePagination = () => {
    const queries = Object.fromEntries([...params])
    console.log(queries);
    if (Number(children)) queries.page = children
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString()
    })
    console.log(queries);
  }
  return (
    <button className={clsx('p-4 font-semibold w-14 h-14 flex justify-center ', !Number(children) && 
    'items-end pb-4',Number(children) && 'items-center hover:rounded-full hover:bg-gray-300', +params.get('page') === +children && 'rounded-full bg-gray-300',
    !+params.get('page') && +children===1 && 'rounded-full bg-gray-300'
  )}
    onClick={() => {
      handlePagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }} 
    type='button'
    disabled={!Number(children)}
    >
        {children}
    </button>
  )
}

export default memo(PagiItem)
