import { createReducer } from '@reduxjs/toolkit';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { languageActions as actions } from './';

const localeInitialState = null
const locale = createReducer(localeInitialState, {
    [actions.changeLanguage]: (_, { payload }) => payload,
    [actions.clearLanguage]: () => localeInitialState
});

export default persistCombineReducers({ key: 'locale', storage, }, { locale })
