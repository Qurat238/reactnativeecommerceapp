import { createReducer, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const serverUrl = "https://backend-gray-sigma.vercel.app";

//Actions
export const addToCart = createAction("addToCart");
export const removeCartItem = createAction("removeCartItem");
export const saveShippingInfo = createAction("saveShippingInfo");
export const initializeCart = createAction("initializeCart");


// Thunks
export const loadCart = createAsyncThunk("cart/loadCart", async (_, { dispatch }) => {
  const cartItems = await AsyncStorage.getItem("cartItems");
  const shippingInfo = await AsyncStorage.getItem("shippingInfo");

  if (cartItems) {
    dispatch(initializeCart({
      cartItems: cartItems ? JSON.parse(cartItems) : [],
      shippingInfo: shippingInfo ? JSON.parse(shippingInfo) : {},
    }));
  }
});


//Add To Cart
export const addItemsToCart = (id, quantity) => async(dispatch,getState) => {
    const {data} = await axios.get(`${serverUrl}/api/v1/product/${id}`);
    dispatch(addToCart({
        product: data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.images[0].url,
        stock:data.product.stock,
        quantity
    }));    
    await AsyncStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
} 

//Remove From Cart
export const removeItemsFromCart = (id) => async(dispatch,getState) => {
    dispatch(removeCartItem(id));
    await AsyncStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

//Save Shipping Info
export const savingShippingInfo = (data) => async(dispatch,getState) => {
    dispatch(saveShippingInfo(data));
    await AsyncStorage.setItem("shippingInfo",JSON.stringify(getState().cart.shippingInfo));
}


// Reducer
const initialCartState = {
  cartItems: [],
  shippingInfo: {}
};


export const cartReducer = createReducer(initialCartState, (builder) => {
    builder
      .addCase(addToCart, (state, action) => {
        const item = action.payload;
        const isItemExist = state.cartItems.find((i) => i.product === item.product);
  
        if (isItemExist) {
          state.cartItems = state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          );
        } else {
          state.cartItems.push(item);
        }
      })
      .addCase(removeCartItem, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (i) => i.product !== action.payload
        );
      })
      .addCase(saveShippingInfo, (state, action) => {
        state.shippingInfo = action.payload;
      })
      .addCase(initializeCart, (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.shippingInfo = action.payload.shippingInfo;
      })
  });
