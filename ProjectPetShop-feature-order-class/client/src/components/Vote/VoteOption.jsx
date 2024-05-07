import React, { memo, useRef, useEffect, useState } from 'react';
import logo from 'assets/imgs/Logo.png'
import { voteOptions } from 'utils/contantsDetail';
import {AiFillStar, } from 'react-icons/ai'
import Button from 'components/Buttons/Button';

const VoteOption = ({nameProduct, handleSubmitVoteOption}) => {
    const modalRel = useRef();
    const [chosenScore,setChosenScore] = useState(null)
    const [comment,setComment] = useState('')
    const [score,setScore] = useState(null)



    useEffect(() => {
        if (modalRel.current) {
            modalRel.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
    }, [modalRel.current]);


    return (
        <div onClick={e => e.stopPropagation()} ref={modalRel} className='bg-white w-[700px] p-4 gap-4 flex-col flex items-center justify-center'>
            <img src={logo} alt="logo" className='w-[300px] my-8 object-contain' />
            <h2 className='text-center text-medium text-lg'>{`Đánh giá sản phẩm ${nameProduct}`}</h2>
            <textarea
            placeholder='Hãy để lại nhận xét'
            value={comment}
            onChange={e => setComment(e.target.value)} 
            className='form-input w-full placeholder:italic placeholder:text-sm placeholder:text-gray-500 text-sm' cols="30" rows="3"></textarea>
            <div className='w-full flex flex-col gap-4'>
                <p className='flex items-center justify-center'>Bạn cảm thấy sản phẩm như thế nào?</p>
                <div className='flex justify-center items-center gap-4 '>
                    {voteOptions.map(el => (
                        <div 

                        className='w-[100px] bg-gray-200 cursor-pointer rounded-md mb-6 h-[100px] flex items-center justify-center flex-col' key={el.id}
                        onClick={() => {
                            setChosenScore(el.id)
                            setScore(el.id)
                        }}
                        >
                            {Number(chosenScore) && chosenScore >= el.id ? <AiFillStar color='orange'/> : <AiFillStar color='gray'/>}
                            <span>{el.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Button handdleOnClick={() => handleSubmitVoteOption({comment, score: chosenScore})} fw>Xác nhận</Button>
        </div>
    );
};

export default memo(VoteOption);
