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

    removeIngredient: (
      state = initialState,
      action: PayloadAction<{ id: string }>
    ) => {
      return state.filter((ingredient) => ingredient.id !== action.payload.id);
    },

    updateIngredient: (
      state = initialState,
      action: PayloadAction<TIngredient>
    ) => {
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

// ingredientSlice.actions is an object that contains all of the action creators generated by the createSlice function
// for the ingredientSlice reducer. Each action creator is a function that returns an action object with a type property
// and an optional payload property.
export const { addIngredient, removeIngredient, updateIngredient } =
  ingredientSlice.actions;

export default ingredientSlice.reducer;