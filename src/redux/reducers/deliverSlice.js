import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deliverList: [],
  deliverInfo: {
    id: 0,
    restaurantName: '',
    created: '',
    prepareTime: 0,
    deliverTime: 0,
    totalTime: 0,
    showMyListDeliver: false,
  },
};

const DeliverSlice = createSlice({
  name: 'deliver',
  initialState,
  reducers: {
    addDeliverList(state) {
      state.deliverList.push(state.deliverInfo);
    },
    deleteDeliverList(state, action) {
      state.deliverList = state.deliverList.filter(
        (item) => item.id !== action.payload
      );
    },
    setDeliverInfo(state, action) {
      state.deliverInfo = action.payload;
    },
    setDeliverId(state, action) {
      state.deliverInfo.id = action.payload;
    },
    setRestaurantName(state, action) {
      state.deliverInfo.restaurantName = action.payload;
    },
    setCreated(state, action) {
      state.deliverInfo.created = action.payload;
    },
    setPrepareTime(state, action) {
      state.deliverInfo.prepareTime = action.payload;
    },
    setDeliverTime(state, action) {
      state.deliverInfo.deliverTime = action.payload;
    },
    setTotalTime(state, action) {
      state.deliverInfo.totalTime = action.payload;
    },
    showMyListDeliver(state, action) {
      state.deliverInfo.showMyListDeliver = action.payload;
    },
  },
});

export const selectDeliverList = (state) => state.deliver.deliverList;
export const selectDeliverInfo = (state) => state.deliver.deliverInfo;
export const selectShowMyListDeliver = (state) =>
  state.deliver.deliverInfo.showMyListDeliver;

export const {
  addDeliverList,
  deleteDeliverList,
  setDeliverId,
  setDeliverInfo,
  setRestaurantName,
  setCreated,
  setPrepareTime,
  setDeliverTime,
  setTotalTime,
  showMyListDeliver,
} = DeliverSlice.actions;

const deliverReducer = DeliverSlice.reducer;

export default deliverReducer;
