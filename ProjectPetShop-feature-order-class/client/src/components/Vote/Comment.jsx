import React, { memo } from 'react'
import avatarUser from 'assets/imgs/avatarUser.png'
import moment from 'moment'
import { renderStarFromNumber } from 'utils/helpers'

const Comment = ({image = avatarUser, name = 'Anonymos', updatedAt, comment,star}) => {
  return (
    <div className='flex gap-4'>
      <div className='flex-none'>
            <img src={image} alt="avatar" className='w-[25px] h-[25px] object-cover rounded-full'/>
      </div>
      <div className='flex flex-col flex-auto'>
            <div className='flex justify-between items-center'>
                <h3 className='font-semibold'>{name}</h3>
                <span className='text-xs italic'>{moment(updatedAt)?.fromNow()}</span>
            </div>
            <div className='flex flex-col gap-2 pl-4 text-sm mt-4 border py-2 bg-gray-100 border-gray-300'>
                <div className='flex items-center gap-1'>
                <span className='font-semibold'>Đánh giá</span>
                <span className='flex items-center gap-1'>
                                    {renderStarFromNumber(star)?.map((el, index) => (
                                        <span key={index}>{el}</span>
                                    ))}
                </span>
                </div>
                <div className='flex gap-1'>
                <span className='font-semibold'>Nhận xét</span>
                <span className='flex items-center gap-1'>{comment}</span>
                </div>
                             
            </div>
      </div>
    </div>
  )
}

export default memo(Comment)
