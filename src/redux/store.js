import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice'
import addressReducer from './reducers/addressSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    address: addressReducer,
  },
})