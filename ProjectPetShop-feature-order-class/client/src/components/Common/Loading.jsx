import React, { memo } from 'react'
import { HashLoader } from 'react-spinners'

const Loading = () => {
  return (
    <HashLoader color='#CFF1F1'/>
  )
}

export default memo(Loading)
