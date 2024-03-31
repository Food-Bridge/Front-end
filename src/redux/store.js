import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/authSlice';
import addressReducer from './reducers/addressSlice';
import cartReducer from './reducers/cartSlice';

const storageConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'address', 'cart'],
  expire: 1800000,
};

const reducers = combineReducers({
  auth: authReducer,
  address: addressReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(storageConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;