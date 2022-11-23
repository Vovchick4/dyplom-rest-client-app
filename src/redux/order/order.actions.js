import { createAction } from '@reduxjs/toolkit';

export const orderRequest = createAction('order/request');
export const orderSuccess = createAction('order/success');
export const orderError = createAction('order/Error');

export const addToCart = createAction('order/addToCart');
export const incrementAmount = createAction('order/incrementAmount');
export const decrementAmount = createAction('order/decrementAmount');
export const deleteCart = createAction('order/deleteCart'); // Delete order item from cart
export const clearCart = createAction('order/clearCart'); // Clear cart completely
