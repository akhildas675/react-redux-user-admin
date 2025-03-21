import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Slices/UserSlice';
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'user', // Key for storing data in localStorage
    storage, // Using localStorage to persist state
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
    },
});

export const persistor = persistStore(store);
