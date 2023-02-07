import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenseTypeDropdownList: [],
  expenseTotal: [],
  expenseList: [],
  formValue: {
    typeId: "",
    amount: "",
    note: "",
  },
};

const ExpenseSlice = createSlice({
  name: "Expense",
  initialState,
  reducers: {
    setExpenseTypeDropdownList(state, action) {
      state.expenseTypeDropdownList = action.payload;
    },
    setExpenseListTotal(state, action) {
      state.expenseTotal = action.payload;
    },
    setExpenseList(state, action) {
      state.expenseList = action.payload;
    },
    setOnChangeExpenseInput(state, action) {
      state.formValue[`${action.payload.Name}`] = action.payload.Value;
    },
    resetOnChangeExpenseInput(state) {
      Object.keys(state.formValue).forEach((i) => (state.formValue[i] = ""));
    },
    deleteExpenseList(state, action) {
      state.expenseList = state.expenseList.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  deleteExpenseList,
  resetOnChangeExpenseInput,
  setExpenseList,
  setExpenseListTotal,
  setExpenseTypeDropdownList,
  setOnChangeExpenseInput,
} = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
