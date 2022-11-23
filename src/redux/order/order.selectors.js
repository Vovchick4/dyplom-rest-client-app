import { createSelector } from '@reduxjs/toolkit';

export const getOrder = (state) => state.order.order;
export const getAddToCart = (state) => state.order.addToCart;
export const getOrderLoad = (state) => state.order.loading;

export const getTotalPrice = createSelector(getAddToCart, (cart) => {
  return Object.values(cart).reduce(
    (prev, cartItem) => cartItem.amount * cartItem.plate.price + prev,
    0
  );
});

export const getTotalAmount = createSelector(getAddToCart, (cart) => {
  return Object.values(cart).reduce(
    (prev, cartItem) => prev + cartItem.amount,
    0
  );
});
