// import { createStore, combineReducers } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import userSlice from '../user/userSlice';

// // Cấu hình cho persisted reducer của user
// const commonPersistConfig = {
//   key: 'shop/user',
//   storage: storage,
//   whitelist: ['isLoggedIn', 'token'] // chỉ lưu các trường này
// };

// // Tạo reducer tổng
// const rootReducer = combineReducers({
//   user: persistReducer(commonPersistConfig, userSlice),
//   // app: appSlice // Nếu bạn muốn sử dụng appSlice
// });

// // Tạo Redux store
// export const store = createStore(rootReducer);

// // Tạo persistor cho Redux store
// export const persistor = persistStore(store);
