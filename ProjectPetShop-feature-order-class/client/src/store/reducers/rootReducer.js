import { combineReducers } from "redux";
import appReducer from "./appReducer";
import newsReducer from "./newsReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import testPersistReducer from "./testPersistReducer";
import getFooterHight from "./interfaceReducer";
import userReducer from '../user/userSlice'; // Assuming you named it userReducer
import modalReducer from "./appSlice";
import categoriesReducer from './categoriesReducer';

const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const commonPersistConfig = {
  key: 'shop/user',
  storage: storage,
  whitelist: ['isLoggedIn', 'token', 'current', 'currentCart'] // chỉ lưu các trường này
};

const testPersisConfig = {
  ...commonConfig,
  key: "tPersist",
  whitelist: ["curData"], //những giá trị cần giữ lại trong storage
};


const rootReducer = combineReducers({
  modal: modalReducer,
  app: appReducer,
  paper: newsReducer,
  interf: getFooterHight,
  testPersis: persistReducer(testPersisConfig, testPersistReducer),
  user: persistReducer(commonPersistConfig, userReducer),
  categories: categoriesReducer,
});

export default rootReducer;
