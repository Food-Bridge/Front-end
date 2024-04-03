import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api/instance';

const CommunitySlice = createSlice({
  name: 'community',
  initialState: {
    weekly: [],
    daily: [],
    latest: [],
  },
  reducers: {
    setWeeklyPost(state, action) {
      state.weekly = action.payload;
    },
    setDailyPost(state, action) {
      state.daily = action.payload;
    },
    setLatestPost(state, action) {
      state.latest = action.payload;
    },
  },
});

export const selectWeeklyPost = (state) => state.community.weekly;
export const selectDailyPost = (state) => state.community.weekly;
export const selectLatestPost = (state) => state.community.weekly;

export const { setWeeklyPost, setDailyPost, setLatestPost } =
  CommunitySlice.actions;

export const fetchPostData = () => async (dispatch) => {
  await axiosInstance.get('/community/weekly/').then((response) => {
    dispatch(setWeeklyPost(response.data));
  });
  await axiosInstance.get('/community/daily/').then((response) => {
    dispatch(setDailyPost(response.data));
  });
  await axiosInstance.get('/community/latest/').then((response) => {
    dispatch(setLatestPost(response.data));
  });
};

export default CommunitySlice.reducer;
