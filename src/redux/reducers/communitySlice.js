import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api/instance';

const initialState = localStorage.getItem('communityState')
  ? JSON.parse(localStorage.getItem('communityState'))
  : {
      weekly: [],
      daily: [],
      latest: [],
    };

const CommunitySlice = createSlice({
  name: 'community',
  initialState,
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
export const selectDailyPost = (state) => state.community.daily;
export const selectLatestPost = (state) => state.community.latest;

export const { setWeeklyPost, setDailyPost, setLatestPost } =
  CommunitySlice.actions;

export const fetchPostData = () => async (dispatch, getState) => {
  await axiosInstance.get('/community/weekly/').then((response) => {
    dispatch(setWeeklyPost(response.data));
  });
  await axiosInstance.get('/community/daily/').then((response) => {
    dispatch(setDailyPost(response.data));
  });
  await axiosInstance.get('/community/latest/').then((response) => {
    dispatch(setLatestPost(response.data));
  });

  localStorage.setItem('communityState', JSON.stringify(getState().community));
};

export default CommunitySlice.reducer;
