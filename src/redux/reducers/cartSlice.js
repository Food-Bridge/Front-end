import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    isDeliver: true,
    store: [],
    menu: [],
    menuImg: {}
  },
  reducers: {
    addMenu(state) {
      state.isMenuIn = true;
    },
    deleteMenu(state) {
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
    setMenuImg(state, action) {
      state.menuImg = action.payload
    }
  },
});

export const {
  deleteMenu,
  setDeliver,
  setPickUp,
  setCurrentStore,
  setMenuData,
  setMenuImg
} = CartSlice.actions;

export const selectIsDeliver = (state) => state.cart.isDeliver;
export const selectStore = (state) => state.cart.store;
export const selectMenu = (state) => state.cart.menu;
export const selectMenuImg = (state) => state.cart.menuImg

export default CartSlice.reducer;
