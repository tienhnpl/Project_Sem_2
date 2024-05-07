import React, { memo } from 'react'

const SelectOption = ({icon}) => {
  return (
    <div className='w-12 h-12 bg-white rounded-full border shadow-md flex items-center justify-center
     hover:bg-gray-800 hover:text-white hover:border-gray-800'>
      {icon}
    </div>
  )
}

export default memo(SelectOption)
