import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rootReducers } from "./Reducers";
import { Apiservices } from "./middlewares/apiServices";

export const Store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(Apiservices.middleware),
});

setupListeners(Store.dispatch);
