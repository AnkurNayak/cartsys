/* eslint-disable no-unused-vars */
import { configureStore, createSlice } from "@reduxjs/toolkit";

export const getProductListFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("productlist"));

export const getCartFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("cartitems"));

const productList = createSlice({
  name: "productlist",
  initialState: [],
  reducers: {
    getProductList(state, action) {
      // action.payload has been serving from localStorage check : apiHanlder.js
      return action.payload;
    },
  },
});

const cart = createSlice({
  name: "cart",
  // Inital State has to be set from localStorage
  // Prevent Data lose from refreshing Or set new initalState
  initialState: getCartFromLocalStorage() || { totalItems: 0, itemList: [] },
  reducers: {
    additemtoCart(state, action) {
      // Update the state without modifying the itemList directly
      const updatedState = {
        totalItems: state.totalItems + 1,
        itemList: [...state.itemList, action.payload],
      };
      // Update the local storage
      localStorage.setItem("cartitems", JSON.stringify(updatedState));
      // Return the updated state
      return updatedState;
    },
    itemPurchased(state) {
      // Clear the local storage
      localStorage.removeItem("cartitems");
      // Reset the state to the initial state
      return { totalItems: 0, itemList: [] };
    },
  },
});

const store = configureStore({
  reducer: {
    productlist: productList.reducer,
    cartitems: cart.reducer,
  },
});

export { store };

export const { getProductList } = productList.actions;
export const { additemtoCart, itemPurchased } = cart.actions;
