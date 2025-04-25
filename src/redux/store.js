// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

import authReducer from './slices/authSlice'; // your auth slice
import { apiService } from './services/apiService'; // RTK Query base api

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // only persist the auth slice
};

const rootReducer = combineReducers({
    auth: authReducer,
    [apiService.reducerPath]: apiService.reducer, // RTK Query slice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiService.middleware),
});

export const persistor = persistStore(store);
