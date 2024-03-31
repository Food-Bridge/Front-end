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

export const persistor = persistStore(store, null, () => {
  const now = new Date().getTime();
  Object.keys(store.getState()).forEach(key => {
    const state = store.getState()[key];
    if (state?.timestamp && now - state.timestamp > EXPIRATION_TIME) {
      store.dispatch({ type: 'REMOVE_EXPIRED_DATA', key });
    }
  });
});

export default store;