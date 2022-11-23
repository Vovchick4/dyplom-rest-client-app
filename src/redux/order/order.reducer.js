import { createReducer } from '@reduxjs/toolkit';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { orderActions as actions } from '.';

// API data for submitting order
const orderInitialState = null;
const order = createReducer(orderInitialState, {
  [actions.orderSuccess]: (_, { payload }) => payload.data.data,
  [actions.orderError]: () => orderInitialState,
});

// Order items
const addToCartInitialState = {};
const addToCart = createReducer(addToCartInitialState, {
  [actions.addToCart]: (state, { payload }) => {
    return {
      ...state,
      [payload.plate.id]: payload,
    };
  },
  [actions.incrementAmount]: (state, { payload }) => {
    const cartItem = state[payload];
    if (!cartItem) return state;

    return {
      ...state,
      [payload]: {
        ...cartItem,
        amount: cartItem.amount + 1,
      },
    };
  },
  [actions.decrementAmount]: (state, { payload }) => {
    const cartItem = state[payload];
    if (!cartItem) return state;

    return {
      ...state,
      [payload]: {
        ...cartItem,
        amount: cartItem.amount - 1,
      },
    };
  },
  [actions.deleteCart]: (state, { payload }) => {
    const cart = { ...state };
    delete cart[payload];

    return cart;
  },
  [actions.clearCart]: () => addToCartInitialState,
});

const loadingInitialState = false;
const loading = createReducer(loadingInitialState, {
  [actions.orderRequest]: () => true,
  [actions.orderSuccess]: () => false,
  [actions.orderError]: () => false,
});

export default persistCombineReducers(
  { key: 'order', storage, blacklist: ['loading'] },
  { order, addToCart, loading }
);
