import {  configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import postSlice from './postSlice.js';
import {
  persistReducer,
  persistStore
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from 'redux';

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
    auth:authSlice,
    post:postSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
