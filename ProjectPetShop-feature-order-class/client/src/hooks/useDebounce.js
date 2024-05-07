import React, {useEffect, useState} from 'react'

const useDebounce = (value, ms) => {

    const [decounceValue, setDecounceValue] = useState('')
    useEffect(() => {
    const setTimeOutId = setTimeout(() => {
            setDecounceValue(value)
        },ms)

        return () => {
            clearTimeout(setTimeOutId)
        }

    },[value,ms])
  return decounceValue
}

export default useDebounce

// muốn khi mà nhập giá thì sẽ gọi ra api
// vấn đề: gọi api liên tục theo mỗi lượt nhập
// résolve: chỉ call api khi mà người dùng nhập xong
// thời gian onchange , 

// tách price thành 2 biến
// 1. biến để phục vụ UI, gõ tới đâu thì lưu tới đó => UI render
// 2. biến thứ 2 dùng để quyết định call api => settimeout => biến sẽ được gán sau 1 khoảng thời gian