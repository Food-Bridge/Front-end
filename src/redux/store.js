import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice'

export default configureStore({
  reducer: {
    auth: authReducer
  },
})