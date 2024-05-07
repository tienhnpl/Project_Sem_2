import React, {memo} from 'react'
import { useDispatch } from 'react-redux'
import {showModal} from '../../store/reducers/appSlice'

const Modal = ({children}) => {
    const dispatch = useDispatch()
  return (
    <div onClick={() => dispatch(showModal(false, null))}
 className='absolute inset-0 z-50000 bg-overlay flex items-center justify-center'>
      {children}
    </div>
  )
}

export default memo(Modal)
