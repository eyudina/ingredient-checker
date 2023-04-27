import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "types";
import { ingredientDataMock } from "mocks/mocks";

const initialState: TIngredient[] = ingredientDataMock;

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      return [action.payload, ...state];
    },
    removeIngredient: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((ingredient) => ingredient.id !== action.payload.id);
    },
    updateIngredient: (state, action: PayloadAction<TIngredient>) => {
      return state.map((ingredient) => {
        if (ingredient.id === action.payload.id) {
          return action.payload;
        } else {
          return ingredient;
        }
      });
    },
  },
});

export const { addIngredient, removeIngredient, updateIngredient } =
  ingredientSlice.actions;

export default ingredientSlice.reducer;
