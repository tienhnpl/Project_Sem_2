// Import action types
import { SHOW_MODAL } from '../actions/actionTypes';
// import { SHOW_CART } from '../actions/actionTypes';
import actionTypes from '../actions/actionTypes';




// Define initial state
const initialState = {
    isShowModal: false,
    modalChildren: null,
    categories: [], // Thêm trạng thái cho danh mục
    loading: false, // Thêm trạng thái cho quá trình tải danh mục
    error: null, // Thêm trạng thái cho lỗi của danh mục
};

// Define action creators
export const showModal = (isShowModal, modalChildren) => ({
    type: SHOW_MODAL,
    payload: {
        isShowModal,
        modalChildren
    }
});

export const showCart = () => ({
    type: actionTypes.SHOW_CART,
});
// Define reducer function
const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                isShowModal: action.payload.isShowModal,
                modalChildren: action.payload.modalChildren
            };
            case actionTypes.SHOW_CART:
            return {
                ...state,
                isShowCart: !state.isShowCart
            };   
        default:
            return state;
    }
};



export default modalReducer;



