import { createAction } from '@reduxjs/toolkit';

export const fetchDetailsRequest = createAction(
  'hotel/fetchDetails/request'
);
export const fetchDetailsSuccess = createAction(
  'hotel/fetchDetails/success'
);
export const fetchDetailsError = createAction('hotel/fetchDetails/error');
