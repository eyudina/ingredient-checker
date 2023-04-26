import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProperty } from "types";
import { propertiesList } from "mocks/mocks";

const initialState: TProperty[] = propertiesList;

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    addProperty: (state, action) => {
      return [action.payload, ...state];
    },
    updateProperty: (state, action) => {
      return state.map((property) => {
        if (property.id === action.payload.id) {
          return action.payload;
        } else {
          return property;
        }
      });
    },
    removeProperty: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((property) => property.id !== action.payload.id);
    },
  },
});

export const { addProperty, updateProperty, removeProperty } =
  propertySlice.actions;

export default propertySlice.reducer;
