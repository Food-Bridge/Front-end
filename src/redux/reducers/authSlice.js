import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import axiosInstance from '../../api/instance';


export const deleteTokens = createAsyncThunk('auth/deleteTokens', async () => {
  document.cookie =
    'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  sessionStorage.removeItem('refreshToken');
  return true;
});

export const setTokens = createAsyncThunk(
  'auth/setTokens',
  async ({ access, refresh }, thunkAPI) => {
    document.cookie = `accessToken=${access}; path=/`;
    sessionStorage.setItem('refreshToken', refresh);
    thunkAPI.dispatch(login());
    return true;
  }
);

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async () => {
  try {
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
});

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['isLoggedIn', 'isSeller', 'owner', 'profile'],
};

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
      state.isSeller = false;
      state.owner = null;
      state.profile = {
        image: null,
        nickname: null,
      };
    },
    loginS: (state) => {
      state.isSeller = true;
    },
    setOwner: (state, action) => {
      state.owner = action.payload;
    },
    setProfile: (state, action) => {
      const { image, nickname } = action.payload;
      state.profile.image = image;
      state.profile.nickname = nickname;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { login, logout, loginS, logoutS, setOwner, setProfile } =
  authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectProfile = (state) => state.auth.profile;
export const selectIsSeller = (state) => state.auth.isSeller;
export const selectOwner = (state) => state.auth.owner;

export const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer
);

export default persistedAuthReducer;
