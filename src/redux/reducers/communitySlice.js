// communitySlice.js 파일

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  like: {
    isLiked: false,
  },
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    toggleLike(state, action) {
      state.like.isLiked = action.payload;
    },
  },
});

export const { toggleLike } = communitySlice.actions;
export default communitySlice.reducer;