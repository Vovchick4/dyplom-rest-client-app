import { createReducer } from '@reduxjs/toolkit';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { hotelActions as actions } from './';

const dataInitialState = null;
const data = createReducer(dataInitialState, {
  [actions.fetchDetailsSuccess]: (_, { payload }) => payload.data,
  [actions.fetchDetailsError]: () => dataInitialState,
});

const loadingInitialState = false;
const loading = createReducer(loadingInitialState, {
  [actions.fetchDetailsRequest]: () => true,
  [actions.fetchDetailsSuccess]: () => false,
  [actions.fetchDetailsError]: () => false,
});

export default persistCombineReducers(
  { key: 'hotel', storage, blacklist: ['loading'] },
  { data, loading }
);
