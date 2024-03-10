import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    profile: {
      image: null,
      nickname: null
    }
  },
  reducers: {
    login: state => {
      state.isLoggedIn = true;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.profile = {
        image: null,
        nickname: null
      };
    },
    setProfile: (state, action) => {
      const { image, nickname } = action.payload;
      state.profile = {
        image,
        nickname
      };
    }
  },
});

export const { login, logout, setProfile } = authSlice.actions;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectProfile = state => state.auth.profile;

export default authSlice.reducer;
