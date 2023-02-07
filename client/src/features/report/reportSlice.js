import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenseReport: [],
  saleReport: [],
  purchaseReport: [],
  returnReport: [],
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setExpenseReport(state, action) {
      state.expenseReport = action.payload;
    },
    setSaleReport(state, action) {
      state.saleReport = action.payload;
    },
    setPurchaseReport(state, action) {
      state.purchaseReport = action.payload;
    },
    setReturnReport(state, action) {
      state.returnReport = action.payload;
    },
  },
});

export const {
  setExpenseReport,
  setPurchaseReport,
  setReturnReport,
  setSaleReport,
} = reportSlice.actions;
export default reportSlice.reducer;
