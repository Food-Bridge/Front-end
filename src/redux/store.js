import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/authSlice';
import addressReducer from './reducers/addressSlice';
import cartReducer from './reducers/cartSlice';

const EXPIRATION_TIME = 30 * 60 * 1000;

const storageConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'address', 'cart'],
  timeout: 5000,
};

const rootReducer = combineReducers({
  auth: authReducer,
  address: addressReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(storageConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

store.subscribe(() => {
  const now = new Date().getTime();
  const authState = store.getState().auth;
  if (authState.timestamp && now - authState.timestamp > EXPIRATION_TIME) {
    store.dispatch({ type: 'auth/REMOVE_EXPIRED_DATA' });
  }
});

export const persistor = persistStore(store);

export default store;