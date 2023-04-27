import { configureStore } from "@reduxjs/toolkit";
import ingredientReducer from "./ingredientSlice";
import propertyReducer from "./propertySlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    ingredient: ingredientReducer,
    property: propertyReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
