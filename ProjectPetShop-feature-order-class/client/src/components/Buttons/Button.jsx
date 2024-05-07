import React, { memo } from 'react'

const Button = ({children, handdleOnClick, style, iconsBefore, iconAfter, fw, type='button'}) => {
  return (
    <button
    type={type}
    className={style ? style : `bg-black text-white py-3 mb-4 font-semibold rounded-lg ${fw ? 'w-full' : 'w-fit'}`}
    onClick={() => {handdleOnClick && handdleOnClick()}}
    >
        {iconsBefore}
        {children}
        {iconAfter}
    </button>
  )
}

export default memo(Button)
