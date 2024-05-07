import React, { memo } from 'react'
import clsx from 'clsx'

const InputField = ({value, setValue, nameKey, type, invalidFields, setInvalidFields, style, fullWidth, placeholder, isHideLabel}) => {
  return (
    <div className={clsx('relative mb-2 flex flex-col', fullWidth && 'w-full')}>
        {!isHideLabel && value?.trim() !== '' && <label className='text-[10px] animate-slide-top absolute top-0 left-[12px] block bg-white px-1' htmlFor={nameKey}>{nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}</label>}
      <input 
      type={type || 'text'}
      className={clsx('flex-1 py-2 border w-full my-2 rounded-sm px-4 outline-none placeholder:text-sm placeholder:italic', style, 'text-gray-700')}
      placeholder={placeholder || nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}
      value={value}
      onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value}))}
      onFocus={() => setInvalidFields && setInvalidFields([])}
       />
       {invalidFields?.some(el => el.name === nameKey) && <small className='text-red-600 italic'>
        {invalidFields.find(el => el.name === nameKey)?.mes}
        </small>}
    </div>
  )
}

export default memo(InputField)
