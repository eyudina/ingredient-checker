import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProperty } from "types/types";
import { mockPropertiesList } from "mocks/mocks";

const initialState: TProperty[] = mockPropertiesList;

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    addProperty: (state, action: PayloadAction<TProperty>) => {
      return [action.payload, ...state];
    },
    removeProperty: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((property) => property.id !== action.payload.id);
    },
    updateProperty: (state, action: PayloadAction<TProperty>) => {
      return state.map((property) => {
        if (property.id === action.payload.id) {
          return action.payload;
        } else {
          return property;
        }
      });
    },
  },
});

export const { addProperty, removeProperty, updateProperty } =
  propertySlice.actions;

export default propertySlice.reducer;
