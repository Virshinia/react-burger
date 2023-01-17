import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit'
import {BASE_URL} from "../../utils/constatants";
import {getIngredientsAPI} from "../../utils/api";

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients', () => {
    return getIngredientsAPI(`${BASE_URL}/ingredients`)
      .catch (err => {
        console.error(`Could not get ingredients: ${err}`);
      })
  });

const initialState = {
  ingredients: [],
  ingredientDetails: {},
  ingredientsRequested: false,
  requestSucceed: false,
  requestError: false,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    showIngredientDetails: (state, action) => {
      state.ingredientDetails = action.payload
    },
    resetIngredientDetails: (state) => {
      state.ingredientDetails = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.ingredientsRequested = true
    })
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload.data;
      state.requestSucceed = true;
      state.ingredientsRequested = false;
    })
    builder.addCase(getIngredients.rejected, (state) => {
      state.ingredientsRequested = false;
      state.requestSucceed = false;
      state.requestError = true;
      state.ingredients = initialState.ingredients;
      state.ingredientsInConstructor = initialState.ingredientsInConstructor
    })
  }
})

export const {showIngredientDetails, resetIngredientDetails} = ingredientsSlice.actions
export default ingredientsSlice.reducer;

