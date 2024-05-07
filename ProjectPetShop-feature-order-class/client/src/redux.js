// import { createStore, applyMiddleware } from 'redux';
// import { persistStore } from 'redux-persist';
// import { thunk } from "redux-thunk";

// Cấu hình cho persisted reducer của user
// const commonPersistConfig = {
//   key: 'shop/user',
//   storage: storage,
//   whitelist: ['isLoggedIn', 'token'] // chỉ lưu các trường này
// };

// Tạo reducer tổng
// const rootReducer = combineReducers({
//   user: persistReducer(commonPersistConfig, userSlice),
//   // app: appSlice // Nếu bạn muốn sử dụng appSlice
// });

// // Tạo Redux store với middleware là thunk
// const store = createStore(rootReducer, applyMiddleware(thunk));

// // Tạo persistor cho Redux store
// const persistor = persistStore(store);

// export { store, persistor };
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import storage from 'redux-persist/lib/storage';
import { thunk } from "redux-thunk";
import { persistStore } from "redux-persist";
const reduxConfig = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk)); //dùng để gọi api
  const persistor = persistStore(store);
  return { store, persistor };
};

export default reduxConfig;
