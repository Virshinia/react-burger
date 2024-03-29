import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit'
import {getIngredientsAPI} from "../../utils/api";
import {IIngredientPropTypes, TIngredientDetails} from "../../utils/common-interfaces";

interface IIngredientsState {
  ingredients: Array<IIngredientPropTypes>;
  ingredientDetails: TIngredientDetails;
  ingredientsRequested: boolean;
  requestSucceed: boolean;
  requestError: boolean
}

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients', () => {
    return getIngredientsAPI(`ingredients`)
  });

const initialState: IIngredientsState = {
  ingredients: [],
  ingredientDetails: {
    name: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    image_large: ''
  },
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
      state.ingredientDetails = initialState.ingredientDetails
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
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.ingredientsRequested = false;
      state.requestSucceed = false;
      state.requestError = true;
      state.ingredients = initialState.ingredients;
      console.log(`Couldn't get ingredients: ${action.error.message}`)
    })
  }
})

export const {showIngredientDetails, resetIngredientDetails} = ingredientsSlice.actions
export default ingredientsSlice.reducer;

