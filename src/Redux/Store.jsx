import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import UserReducer from "./Slice/UserSlice"; 
import eventReducer from "./Slice/EventSlice";

// Combine slices
const rootReducer = combineReducers({
    user: UserReducer,
    event: eventReducer,
});

// Persist config
const presisterConfig = {
    key: 'root',
    storage,
    version: 1,
};

// Persist the combined reducer
const persistedReducer = persistReducer(presisterConfig, rootReducer);

// Create store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        });
    }
});

// Create persistor
export const persistor = persistStore(store);
