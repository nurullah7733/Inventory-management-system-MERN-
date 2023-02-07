import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenseTypeTotal: [],
  expenseTypeList: [],
  expenseTypeDetail: [],
};

const ExpenseTypeSlice = createSlice({
  name: "ExpenseType",
  initialState,
  reducers: {
    setExpenseTypeTotal(state, action) {
      state.expenseTypeTotal = action.payload;
    },
    setExpenseTypeList(state, action) {
      state.expenseTypeList = action.payload;
    },
    deleteExpenseTypeFromList(state, action) {
      state.expenseTypeList = state.expenseTypeList.filter(
        (item) => item._id !== action.payload
      );
    },
    setExpenseTypeDetailById(state, action) {
      state.expenseTypeDetail = action.payload;
    },
    resetExpenseTypeDetailById(state) {
      state.expenseTypeDetail = [];
    },
  },
});

export const {
  setExpenseTypeList,
  setExpenseTypeTotal,
  deleteExpenseTypeFromList,
  resetExpenseTypeDetailById,
  setExpenseTypeDetailById,
} = ExpenseTypeSlice.actions;
export default ExpenseTypeSlice.reducer;
