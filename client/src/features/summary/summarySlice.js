import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenseTotal: [],
  expenseLast30Days: [],
  saleTotal: [],
  saleLast30Days: [],
  purchaseTotal: [],
  purchaseLast30Days: [],
  returnTotal: [],
  returnLast30days: [],
};

const SummarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    setExpenseTotal(state, action) {
      state.expenseTotal = action.payload;
    },
    setLast30DaysExpense(state, action) {
      state.expenseLast30Days = action.payload;
    },
    setSaleTotal(state, action) {
      state.saleTotal = action.payload;
    },
    setLast30DaysSale(state, action) {
      state.saleLast30Days = action.payload;
    },
    setPurchaseTotal(state, action) {
      state.purchaseTotal = action.payload;
    },
    setLast30DaysPurchase(state, action) {
      state.purchaseLast30Days = action.payload;
    },
    setReturnTotal(state, action) {
      state.returnTotal = action.payload;
    },
    setLast30DaysReturn(state, action) {
      state.returnLast30days = action.payload;
    },
  },
});

export const {
  setExpenseTotal,
  setLast30DaysExpense,
  setLast30DaysPurchase,
  setLast30DaysReturn,
  setLast30DaysSale,
  setPurchaseTotal,
  setReturnTotal,
  setSaleTotal,
} = SummarySlice.actions;
export default SummarySlice.reducer;
