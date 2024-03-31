import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

export const deleteTokens = createAsyncThunk(
  'auth/deleteTokens',
  async (thunkAPI) => {
    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    sessionStorage.removeItem('refreshToken');
    thunkAPI.dispatch(logout())
    return true;
  }
);

export const setTokens = createAsyncThunk(
  'auth/setTokens',
  async ({ access, refresh }, thunkAPI) => {
    document.cookie = `accessToken=${access}; path=/`;
    sessionStorage.setItem('refreshToken', refresh);
    thunkAPI.dispatch(login());
    return true;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isSeller: false,
    owner: null,
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
    setOwner: (state, action) => {
      const owner = action.payload;
      state.owner = owner;
    },
    setProfile: (state, action) => {
      const { image, nickname } = action.payload;
      state.profile = {
        image,
        nickname,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteTokens.fulfilled, (state) => {
      persistStore(state.store).purge();
    });
  },
});

export const { login, logout, loginS, logoutS, setOwner, setProfile } =
  authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectProfile = (state) => state.auth.profile;
export const selectIsSeller = (state) => state.auth.isSeller;
export const selectOwner = (state) => state.auth.owner;

export default authSlice.reducer;
