// src/redux/tokenSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import type { AztecAddress, Logger, Wallet } from '@aztec/aztec.js';
// import type { TokenContract } from '@aztec/noir-contracts.js/Token';

// Define the shape of the Token type
type Token = {
  symbol: string;
  address?: string;
};

// Define the shape of the State
type State = {
  tokenA: Token | null;
  tokenB: Token | null;
  swapAmountA: string;
  swapAmountB: string;
  liquidity: {
    amountA?: string;
    amountB?: string;
  };
  contract: any | null; // Adding contract to the state to store deployed contract info
  loading: boolean;
  error: string | null;
};

// Initial state of the slice
const initialState: State = {
  tokenA: null,
  tokenB: null,
  swapAmountA: '',
  swapAmountB: '',
  liquidity: {
    amountA: undefined,
    amountB: undefined,
  },
  contract: null, // Default to null for no deployed contract
  loading: false,
  error: null,
};

// interface DeployTokenArgs {
//   adminWallet: Wallet;
//   initialAdminBalance: bigint;
//   logger: Logger; // replace `any` with your logger type if available
// }



// export async function deployToken(adminWallet: Wallet, initialAdminBalance: bigint, logger: Logger) {
//   logger.info(`Deploying Token contract...`);
//   const contract = await TokenContract.deploy(adminWallet, adminWallet.getAddress(), 'TokenName', 'TokenSymbol', 18)
//     .send()
//     .deployed();

//   if (initialAdminBalance > 0n) {
//     // Minter is minting to herself so contract as minter is the same as contract as recipient
//     await mintTokensToPrivate(contract, adminWallet, adminWallet.getAddress(), initialAdminBalance);
//   }

//   logger.info('L2 contract deployed');

//   return contract;
// }

// export async function mintTokensToPrivate(
//   token: TokenContract,
//   minterWallet: Wallet,
//   recipient: AztecAddress,
//   amount: bigint,
// ) {
//   const tokenAsMinter = await TokenContract.at(token.address, minterWallet);
//   const from = minterWallet.getAddress(); // we are setting from to minter here because we need a sender to calculate the tag
//   await tokenAsMinter.methods.mint_to_private(from, recipient, amount).send().wait();
// }

export const deployTokenAction = createAsyncThunk<
  any,                   // Return type (fulfilled value) → replace `any` with contract type
  any,       // Argument type
  { rejectValue: string } // Rejected payload type
>(
  "token/deployToken",
  async ({ adminWallet, initialAdminBalance, logger }, { rejectWithValue }) => {
    try {
      // const contract = await deployToken(adminWallet, initialAdminBalance, logger);
      // return contract;
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || "An error occurred during deployment"
      );
    }
  }
);


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
      action: PayloadAction<{ amountA?: string, amountB?: string }>
    ) {
      state.liquidity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // When the deployToken action is pending (i.e., the deployment is in progress)
      .addCase(deployTokenAction.pending, (state) => {
        state.loading = true;
        state.error = null; // clear previous error
      })
      // When the deployToken action is fulfilled (i.e., deployment successful)
      .addCase(deployTokenAction.fulfilled, (state, action) => {
        state.loading = false;
        state.contract = action.payload; // Set deployed contract
      })
      // When the deployToken action is rejected (i.e., deployment failed)
      .addCase(deployTokenAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error"; // Set error message
      });
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
