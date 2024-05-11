import icons from "./icons"

const { FaStar, FaRegStar } = icons

export const fotmatPrice = number => Math.round(number / 1000) * 1000

export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-')

export const renderStarFromNumber = (number) => {
    if (!Number(number)) return
    // 4 => [1,1,1,1,0]
    // 2 => [1,1,0,0,0]
    const stars = [] 
    number = Math.round(number)
    for(let i = 0; i < +number; i++) stars.push(<FaStar color="orange"/>)
    for(let i = 5; i > +number; i--) stars.push(<FaRegStar color="orange"/>)
    return stars 
}

export const validate = (payload, setInvalidFields) => {
    let invalids = 0
    const formatPayload = Object.entries(payload)
    for (let arr of formatPayload){
        if (arr[1].trim() === '') {
            invalids++
            setInvalidFields(prev => [...prev, {name: arr[0], mes: 'Hãy nhập vào đây'}])
        }
    }
    for (let arr of formatPayload){
        switch (arr[0]) {
            case 'email':
                const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!arr[1].match(regex)){
                    invalids++
                    setInvalidFields(prev => [...prev, {name: arr[0], mes: 'Email không hợp lệ'}])
                }
                break ;
                case 'password':
                
                if (arr[1].length <6){
                    invalids++
                    setInvalidFields(prev => [...prev, {name: arr[0], mes: 'Mật khẩu tối thiểu 6 ký tự'}])
                }
                break;
            default:
                break;
        }
    }

    return invalids
}

export const formatPrice = number => Math.round(number/1000) * 1000

export const formatMoney = number => Number(number?.toFixed(1)).toLocaleString()

export const generateRange = (start, end) => {
    const length = end+1-start
    return Array.from({length}, (_, index) => start + index)
}

export function getBase64(file) {
    if (!file) return ''
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  } 