import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api/instance';

const AddressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
    defaultId: null,
  },
  reducers: {
    updateAddresses(state, action) {
      state.addresses = action.payload;
    },
    setDefaultId(state, action) {
      state.defaultId = action.payload;
    },
    editAddressNickname(state, action) {
      const { id, nickname } = action.payload;
      const address = state.addresses.find((address) => address.id === id);
      if (address) {
        address.nickname = nickname;
      }
    },
  },
});

export const selectAddresses = (state) => state.address.addresses;
export const selectDefaultId = (state) => state.address.defaultId;
export const { updateAddresses, setDefaultId, editAddressNickname } =
  AddressSlice.actions;

export const fetchAddresses = () => async (dispatch, getState) => {
  const res = await axiosInstance.get('/users/address/');
  dispatch(updateAddresses(res.data));
  const state = getState();
  const defaultId = selectDefaultId(state);
  if (defaultId === null && res.data.length > 0) {
    dispatch(setDefaultId(res.data[0].id));
  }
};

export const setDefaultAddress = (id) => async (dispatch, getState) => {
  const state = getState();
  const currentDefaultId = selectDefaultId(state);
  console.log(currentDefaultId);
  if (currentDefaultId !== id) {
    await axiosInstance.patch(`/users/address/${currentDefaultId}/`, {
      is_default: false,
    });
    console.log(id);
    console.log(currentDefaultId);
    await axiosInstance.patch(`/users/address/${id}/`, { is_default: true });
  }
  dispatch(setDefaultId(id));
  dispatch(fetchAddresses());
};

export const editAddressesNicknames = (updates) => async (dispatch) => {
  for (const { id, editednickname } of updates) {
    await axiosInstance.patch(`/users/address/${id}/`, { nickname: editednickname });
  }
  dispatch(fetchAddresses());
};

export const deleteAddress = (id) => async (dispatch) => {
  await axiosInstance.delete(`/users/address/${id}/`);
  dispatch(fetchAddresses());
};

export default AddressSlice.reducer;
