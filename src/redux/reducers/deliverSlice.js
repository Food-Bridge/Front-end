import { createSlice } from '@reduxjs/toolkit';



const DeliverSlice = createSlice({
  name: 'deliver',
  initialState: {
    deliverList: [],
    deliverInfo: {
      restaurantName: '',
      created: '',
      deliverState: 0,
      prepareTime: 0,
      deliverTime: 0,
      showMyListDeliver: false,
    },
  },
  reducers: {
    setDeliverList(state, action) {
      state.deliverList = action.payload;
    },
    setDeliverInfo(state, action) {
      state.deliverInfo = action.payload;
    },
    setRestaurantName(state, action) {
      state.deliverInfo.restaurantName = action.payload;
    },
    setCreated(state, action) {
      state.deliverInfo.created = action.payload;
    },
    setDeliverState(state, action) {
      state.deliverInfo.deliverState = action.payload;
    },
    setPrepareTime(state, action) {
      state.deliverInfo.prepareTime = action.payload;
    },
    setDeliverTime(state, action) {
      state.deliverInfo.deliverTime = action.payload;
    },
    setShowMyListDeliver(state, action) {
      state.deliverInfo.showMyListDeliver = action.payload;
    },
  },
});

export const selectDeliverList = (state) => state.deliver.deliverList;
export const selectDeliverInfo = (state) => state.deliver.deliverInfo;
export const selectRestaurantName = (state) =>
  state.deliver.deliverInfo.restaurantName;
export const selectCreated = (state) => state.deliver.deliverInfo.created;
export const selectDeliverState = (state) =>
  state.deliver.deliverInfo.deliverState;
export const selectPrepareTime = (state) =>
  state.deliver.deliverInfo.prepareTime;
export const selectDeliverTime = (state) =>
  state.deliver.deliverInfo.deliverTime;
export const selectShowMyListDeliver = (state) =>
  state.deliver.deliverInfo.showMyListDeliver;

export const {
  setDeliverList,
  setDeliverInfo,
  setRestaurantName,
  setCreated,
  setDeliverState,
  setPrepareTime,
  setDeliverTime,
  setShowMyListDeliver,
} = DeliverSlice.actions;

const deliverReducer = DeliverSlice.reducer;

export default deliverReducer;
