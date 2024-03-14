import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice'
import addressReducer from './reducers/addressSlice'
import cartReducer from './reducers/cartSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    address: addressReducer,
    cart: cartReducer,
  },
})