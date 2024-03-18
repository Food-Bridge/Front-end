import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice'
import addressReducer from './reducers/addressSlice'
import cartReducer from './reducers/cartSlice'
import likeReducer from './reducers/likeSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    address: addressReducer,
    cart: cartReducer,
    like: likeReducer,
  },
})