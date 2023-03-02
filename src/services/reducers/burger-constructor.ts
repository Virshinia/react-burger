import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {postOrderAPI} from "../../utils/api";
import {IIngredientPropTypes} from "../../utils/common-interfaces";

export type TConstructorIngredient = IIngredientPropTypes & {uuid: string}
interface IConstructorState {
  bun: TConstructorIngredient | null;
  others: Array<TConstructorIngredient>;
  ingredientsForOrder: string[];
  orderId: number | null;
  postOrderRequested: boolean;
  postOrderSucceed: boolean;
  postOrderError: boolean;
}

const initialState: IConstructorState = {
  bun: null,
  others: [],
  ingredientsForOrder: [],
  orderId: null,
  postOrderRequested: false,
  postOrderSucceed: false,
  postOrderError: false,
}

export const postOrder = createAsyncThunk(
  'constructor/postOrder', (ids: string[]) => {
    return postOrderAPI(`orders`, ids)
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
      state.orderId = action.payload.order.number;
      state.postOrderSucceed = true;
      state.postOrderRequested = false;
    })
    builder.addCase(postOrder.rejected, (state, action) => {
      state.postOrderRequested = false;
      state.postOrderSucceed = false;
      state.postOrderError = true;
      console.log(`Couldn't post order: ${action.error.message}`)
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
