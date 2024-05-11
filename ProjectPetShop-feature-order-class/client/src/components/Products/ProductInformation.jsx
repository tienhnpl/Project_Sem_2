import React, { memo, useState, useCallback } from 'react';
import {productInfoTabs} from 'utils/contantsDetail';
import {VoteBar, Button,Comment,VoteOption} from 'components/index';
// import Button from 'Buttons/Button';
// import Comment from 'Vote/Comment';
import { renderStarFromNumber } from 'utils/helpers';
import { apiRatings } from 'apis';
// import VoteOption from 'Vote/VoteOption';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from 'store/reducers/appSlice';
import Swal from 'sweetalert2';
import path from 'utils/path';
import { useNavigate } from 'react-router-dom';


const ProductInformation = ({ totalRatings, ratings, nameProduct, pid, rerender }) => {
    const [activedTabs, setActivedTabs] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.user);

    const handleSubmitVoteOption = async ({ comment, score }) => {
        if (!comment || !pid || !score) {
            alert('Hãy thử lại');
            return;
        }
        await apiRatings({ star: score, comment, pid, updatedAt: Date.now() }); // Sử dụng await để chờ phản hồi từ API
        dispatch(showModal(false,null))
        rerender()

    };

    const handleVoteNow = () => {
        if (!isLoggedIn) {
            Swal.fire({
                text: 'Đăng nhập để đánh giá',
                cancelButtonText: 'Trở lại',
                confirmButtonText: 'Hãy đăng nhập',
                title: 'Oops',
                showCancelButton:true,
            }).then((rs) => {
                if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
            });
        } else {
            dispatch(showModal(
                true, <VoteOption
                        nameProduct={nameProduct}
                        handleSubmitVoteOption={handleSubmitVoteOption}
                    />
            ))
        }
    };

    // const toggleVote = useCallback(() => {
    //     // setIsVote(!isVote)
    // }, []);

    return (
        <div>
            <div className='flex items-center gap-2 relative bottom-[-1px]'>
                {productInfoTabs.map((el) => (
                    <span
                        className={`py-2 px-4 cursor-pointer ${
                            activedTabs === el.id ? 'bg-white border border-b-0' : 'bg-gray-200'
                        }`}
                        key={el.id}
                        onClick={() => setActivedTabs(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
                <div
                    className={`py-2 px-4 cursor-pointer ${
                        activedTabs === 2 ? 'bg-white border border-b-0' : 'bg-gray-200'
                    }`}
                    onClick={() => setActivedTabs(2)}
                >
                    ĐÁNH GIÁ
                </div>
            </div>
            <div className='w-[80%] border p-4'>
                {productInfoTabs.some((el) => el.id === activedTabs) && productInfoTabs[activedTabs - 1]?.content}
                {activedTabs === 2 && (
                    <div className='flex flex-col p-4'>
                        <div className='flex '>
                            <div className='flex-4 border flex flex-col items-center justify-center'>
                                <span className='font-semibold text-3xl'>{`${totalRatings}/5`}</span>
                                <span className='flex items-center gap-1'>
                                    {renderStarFromNumber(totalRatings)?.map((el, index) => (
                                        <span key={index}>{el}</span>
                                    ))}
                                </span>
                                <span className='text-sm'>{`${ratings?.length} lượt đánh giá`}</span>
                            </div>
                            <div className='flex-6 border flex gap-2 flex-col p-4'>
                                {Array.from(Array(5).keys())
                                    .reverse()
                                    .map((el) => (
                                        <VoteBar 
                                        key={el} 
                                        number={el + 1} 
                                        ratingTotal={ratings?.length} 
                                        ratingCount={ratings?.filter(i => i.star === el + 1)?.length} />
                                    ))}
                            </div>
                        </div>
                        <div className='p-4 flex items-center justify-center text-sm flex-col gap-2'>
                            <span>Bạn đánh giá sao về sản phẩm này</span>
                            <Button handdleOnClick={handleVoteNow}>Đánh giá ngay</Button>
                        </div>
                        <div className='flex flex-col gap-4'>
                            {ratings?.map(el => (
                                <Comment
                                key={el._id}
                                star={el.star}
                                updatedAt={el.updatedAt}
                                comment={el.comment}
                                name={`${el.postedBy?.lastname} ${el.postedBy?.firstname}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(ProductInformation);
