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
  if (defaultId) {
    const newDefaultAddress = res.data.find(
      (address) => address.id === defaultId
    );
    dispatch(setDefaultAddress(newDefaultAddress));
  }
};

export const setDefaultAddress = (address) => async (dispatch, getState) => {
  const state = getState();
  const currentDefaultId = selectDefaultId(state);
  if (currentDefaultId && currentDefaultId !== address.id) {
    await axiosInstance.patch(`/users/address/${currentDefaultId}/`, {
      is_default: false,
    });
    await axiosInstance.patch(`/users/address/${address.id}/`, {
      is_default: true,
    });
  }
  if (currentDefaultId) {
    dispatch(setDefaultId(address.id));
  }
};

export const editAddressesNicknames = (updates) => async (dispatch) => {
  if (updates && updates.length > 0) {
    for (const { id, nickname } of updates) {
      const res = await axiosInstance.patch(`/users/address/${id}/`, {
        nickname: nickname,
      });
      console.log(res);
    }
    dispatch(fetchAddresses());
  }
};

export const deleteAddress = (id) => async (dispatch, getState) => {
  const state = getState();
  const defaultId = selectDefaultId(state);
  if (id === defaultId) {
    dispatch(setDefaultId(null));
  }
  await axiosInstance.delete(`/users/address/${id}/`);
  dispatch(fetchAddresses());
};

export default AddressSlice.reducer;
