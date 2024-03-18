import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api/instance';

const LikeSlice = createSlice({
  name: 'like',
  initialState: {
    storeIds: [],
  },
  reducers: {
    updateStoreIds(state, action) {
      state.storeIds = action.payload;
    },
  },
});

export const selectStoreIds = (state) => state.like.storeIds;
export const { updateStoreIds } = LikeSlice.actions;

export const fectchStoreIds = () => async (dispatch) => {
  const res = await axiosInstance.get('/like/');
  dispatch(updateStoreIds(res.data.like_restaurant_ids));
};

export default LikeSlice.reducer;
