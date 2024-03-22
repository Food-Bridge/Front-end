import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice'
import addressReducer from './reducers/addressSlice'
import cartReducer from './reducers/cartSlice'
import communityReducer from './reducers/communitySlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    address: addressReducer,
    cart: cartReducer,
    community: communityReducer,
  },
})