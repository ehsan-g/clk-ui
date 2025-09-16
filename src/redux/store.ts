import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './tokenSlice.js'; 
export const store = configureStore({
  reducer: {
    tokens: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/// FILE: src/redux/tokenSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Token = {
  symbol: string;
  address?: string;
};

type State = {
  tokenA: Token | null;
  tokenB: Token | null;
  swapAmountA: string;
  swapAmountB: string;
  liquidity: {
    amountA?: string;
    amountB?: string;
  };
};

const initialState: State = {
  tokenA: { symbol: "ETH" },
  tokenB: { symbol: "USDC" },
  swapAmountA: "",
  swapAmountB: "",
  liquidity: {},
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokenA(state, action: PayloadAction<Token>) {
      state.tokenA = action.payload;
    },
    setTokenB(state, action: PayloadAction<Token>) {
      state.tokenB = action.payload;
    },
    setSwapAmountA(state, action: PayloadAction<string>) {
      state.swapAmountA = action.payload;
    },
    setSwapAmountB(state, action: PayloadAction<string>) {
      state.swapAmountB = action.payload;
    },
    setLiquidity(
      state,
      action: PayloadAction<{ amountA?: string; amountB?: string }>
    ) {
      state.liquidity = action.payload;
    },
  },
});

export const {
  setTokenA,
  setTokenB,
  setSwapAmountA,
  setSwapAmountB,
  setLiquidity,
} = tokenSlice.actions;
export default tokenSlice.reducer;
