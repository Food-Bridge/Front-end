import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    isMenuIn: false,
    isDeliver: true,
    store: [],
    menu: [],
  },
  reducers: {
    addMenu(state) {
      state.isMenuIn = true;
    },
    deleteMenu(state) {
      state.isMenuIn = false;
      state.store = [];
      state.menu = [];
    },
    setDeliver(state) {
      state.isDeliver = true;
    },
    setPickUp(state) {
      state.isDeliver = false;
    },
    setCurrentStore(state, action) {
      state.store = action.payload;
    },
    setMenuData(state, action) {
      state.menu = action.payload;
    },
  },
});

export const {
  addMenu,
  deleteMenu,
  setDeliver,
  setPickUp,
  setCurrentStore,
  setMenuData,
} = CartSlice.actions;

export const selectIsMenuIn = (state) => state.cart.isMenuIn;
export const selectIsDeliver = (state) => state.cart.isDeliver;
export const selectStore = (state) => state.cart.store;
export const selectMenu = (state) => state.cart.menu;

export default CartSlice.reducer;
