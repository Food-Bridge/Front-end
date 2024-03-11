import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    isMenuIn: false,
    store: [],
    menu: []
  },
  reducers: {
    addMenu(state) {
      state.isMenuIn = true;
    },
    deleteMenu(state) {
      state.isMenuIn = false;
      state.store = null;
      state.menu = [];
    },
    setCurrentStore(state, action) {
      state.store = action.payload;
    },
    setMenuData(state, action) {
      state.menu = action.payload;
    },
  },
});

export const { addMenu, deleteMenu, setCurrentStore, setMenuData } = CartSlice.actions;

export const selectIsMenuIn = (state) => state.cart.isMenuIn;
export const selectStore = (state) => state.cart.store;
export const selectMenu = (state) => state.cart.menu;

export default CartSlice.reducer;
