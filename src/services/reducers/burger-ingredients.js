import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit'
import {BASE_URL} from "../../utils/constatants";

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async (_, {fulfillWithValue, rejectWithValue}) => {
    try {
      const res = await fetch (`${BASE_URL}/ingredients`);
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json();
      return fulfillWithValue(data.data);
    }
    catch (error) {
      console.error(`Could not get ingredients: ${error}`);
      return rejectWithValue(error)
    }
  }
  )

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
      state.ingredients = action.payload;
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

