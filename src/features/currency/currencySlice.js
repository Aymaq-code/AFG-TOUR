// features/currency/currencySlice.js
import { createSlice } from "@reduxjs/toolkit";

// Exchange rates (hardcoded for demo - in production you'd fetch these from an API)
const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  AED: 3.66,
};

const initialState = {
  currency: "USD",
  exchangeRates: EXCHANGE_RATES,
  selectedCurrency: "USD",
  conversionRate: 1,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      const newCurrency = action.payload;
      state.selectedCurrency = newCurrency;
      state.conversionRate = state.exchangeRates[newCurrency];
    },
    updateExchangeRates: (state, action) => {
      state.exchangeRates = action.payload;
      state.conversionRate = state.exchangeRates[state.selectedCurrency];
    },
  },
});

export const { setCurrency, updateExchangeRates } = currencySlice.actions;
export default currencySlice.reducer;
