import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isSeller: false,
    profile: {
      image: null,
      nickname: null,
    },
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.profile = {
        image: null,
        nickname: null,
      };
    },
    loginS: (state) => {
      state.isSeller = true;
    },
    logoutS: (state) => {
      state.isSeller = false;
    },
    setProfile: (state, action) => {
      const { image, nickname } = action.payload;
      state.profile = {
        image,
        nickname,
      };
    },
  },
});

export const { login, logout,loginS, logoutS, setProfile } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectProfile = (state) => state.auth.profile;
export const selectIsSeller = (state) => state.auth.isSeller;

export const deleteTokens = () => {
  return async (dispatch) => {
    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    sessionStorage.removeItem('refreshToken');
    dispatch(logout());
  };
};

export const setTokens = ({ access, refresh }) => {
  return async (dispatch) => {
    deleteTokens();
    document.cookie = `accessToken=${access}; path=/`;
    sessionStorage.setItem('refreshToken', refresh);
    dispatch(login());
  };
};

export default authSlice.reducer;
