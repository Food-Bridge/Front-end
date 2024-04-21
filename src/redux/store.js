import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/authSlice';
import addressReducer from './reducers/addressSlice';
import cartReducer from './reducers/cartSlice';
import communityReducer from './reducers/communitySlice';
import deliverReducer from './reducers/deliverSlice';

const EXPIRATION_TIME = 30 * 60 * 1000;

const storageConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'cart', 'deliver', 'address'],
  timeout: 5000,
};

const rootReducer = combineReducers({
  auth: authReducer,
  address: addressReducer,
  cart: cartReducer,
  community: communityReducer,
  deliver: deliverReducer,
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
