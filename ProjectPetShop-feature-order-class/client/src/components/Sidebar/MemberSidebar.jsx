import React, { memo, Fragment, useState } from 'react'
import { memberSidebar } from 'utils/contantsDetail'
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx'
import { AiOutlineCaretDown,AiOutlineCaretRight } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import avatar from 'assets/imgs/avatarUser.png'
import { TiArrowForward } from "react-icons/ti";

const activeStyle = 'px-4 py-2 flex items-center gap-2 text-gray-800 bg-blue-400'
const notActiveStyle = 'px-4 py-2 flex items-center gap-2 text-gray-800 hover:bg-blue-100'

const MemberSidebar = () => {
  const [actived,setActived] = useState([])
  const {current} = useSelector(state=>state.user)
  const handleShowTab = (tabID) => {
    if (actived.some(el => el === tabID)) setActived(prev => prev.filter(el => el !== tabID))
    else setActived(prev => [...prev, tabID])
  }
  console.log(current);
  return (
    <div className='bg-white h-full py-4 w-[250px] flex-none'>
      <div className='w-full flex flex-col items-center justify-center py-4'>
        <img className='w-40 h-40 object-cover rounded-md' src={current?.avatar || avatar} alt="avatar" />
        <small>{`${current.lastname} ${current.firstname}`}</small>
      </div>
      <div>
        {memberSidebar.map(el => (
          <Fragment key={el.id}>
              {el.type === 'SINGLE' && <NavLink 
              to={el.path}
              className={({isActive}) => clsx(isActive && activeStyle, !isActive && notActiveStyle)}
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
                </NavLink>}
                {el.type === 'PARENT' && <div onClick={() => handleShowTab(+el.id)} className='flex flex-col text-gray-500'>
                <div className='flex items-center justify-between px-4 py-2 hover:bg-blue-100 cursor-pointer'>
                <div className='flex items-center gap-2'>
                <span>{el.icon}</span>
                <span>{el.text}</span>
                </div>
                {actived.some(id => id === el.id) ? <AiOutlineCaretDown/> : <AiOutlineCaretRight/>}
                </div>
                {actived.some(id => +id === +el.id) && <div className='flex flex-col'>
                  {el.submenu.map(item => (
                    <NavLink 
                    key={item.text} 
                    to={item.path}
                    onClick={e => e.stopPropagation()}
                    className={({isActive}) => clsx(isActive && activeStyle, !isActive && notActiveStyle, 'pl-10')}
                    >
                      {item.text}
                    </NavLink>
                  ))}

                </div>}
                  </div>}
                  
          </Fragment>
        ))}
        <NavLink 
                    to={'/'}
                    className={clsx(notActiveStyle)}
                    >
                      <TiArrowForward size={20}/>
                      Trang chủ
                    </NavLink>
      </div>
    </div>
  )
}

export default memo(MemberSidebar)
