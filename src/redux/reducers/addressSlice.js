import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: [], 
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    updateAddresses(state, action) {
      state.addresses = action.payload; 
    },
  },
});

export const selectAddresses = (state) => state.address.addresses; 
export const { updateAddresses } = addressSlice.actions;

export default addressSlice.reducer;

