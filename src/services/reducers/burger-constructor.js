import {BASE_URL} from "../../utils/constatants";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState = {
  bun: {},
  others: [],
  ingredientsForOrder: [],
  orderId: null,
  postOrderRequested: false,
  postOrderSucceed: false,
  postOrderError: false,
}

export const postOrder = createAsyncThunk(
  'constructor/postOrder',
  async (ids, {fulfillWithValue, rejectWithValue}) => {
    try {
      const res = await fetch (`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "ingredients": ids
        })
      });
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json();
      return fulfillWithValue(data.order.number);
    }
    catch (error) {
      console.error(`Could not get orderId: ${error}`);
      return rejectWithValue(error)
    }
  }
)


export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.others.push(action.payload)
    },
    addBun: (state, action) => {
      state.bun = action.payload
    },
    deleteIngredient: (state, action) => {
      state.others = state.others.filter( (item) => item.uuid !== action.payload)
    },
    moveIngredient: (state, action) => {
      state.others.splice(action.payload.hoverIndex, 0, state.others.splice(action.payload.dragIndex, 1)[0]);
    },
    clearAllIngredients: (state) => {
      state.ingredientsForOrder = initialState.ingredientsForOrder;
      state.others = initialState.others;
      state.bun = initialState.bun
    },
    getIngredientsForOder: (state, action) => {
      console.log(action.payload);
      state.ingredientsForOrder = action.payload
    },
    getOrderId: (state, {payload}) => {
      state.orderId = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state) => {
      state.postOrderRequested = true;
    })
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.orderId = action.payload;
      state.postOrderSucceed = true;
      state.postOrderRequested = false;
    })
    builder.addCase(postOrder.rejected, (state) => {
      state.postOrderRequested = false;
      state.postOrderSucceed = false;
      state.postOrderError = true;
    })
  }
})

export const {
  addIngredient,
  addBun,
  deleteIngredient,
  clearAllIngredients,
  moveIngredient,
  getIngredientsForOder,
  getOrderId
} = constructorSlice.actions
