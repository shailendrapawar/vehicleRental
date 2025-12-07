import themeReducer from "./slices/themeSlice.js"

import { configureStore,combineReducers } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage/session';
import {persistReducer,persistStore} from "redux-persist"

const persistConfig={
    key:"root",
    storage,
     whitelist: ["theme","auth"],
}
const rootReducer=combineReducers({
    theme:themeReducer,
})

const persitedReducer=persistReducer(persistConfig,rootReducer);

export const store=configureStore({
    reducer:persitedReducer,
    middleware:getDefaultMiddleware=>
        getDefaultMiddleware({
            serializableCheck:false,
        })
})

export const persistor=persistStore(store);