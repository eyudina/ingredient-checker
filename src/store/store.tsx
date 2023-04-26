import { configureStore } from "@reduxjs/toolkit";
import ingredientReducer from "./ingredientSlice";
import propertyReducer from "./propertySlice";

export const store = configureStore({
  reducer: {
    ingredient: ingredientReducer,
    property: propertyReducer,
  },
});

// RootState is an exported type that can be used in other files
export type RootState = ReturnType<typeof store.getState>;

export default store;
