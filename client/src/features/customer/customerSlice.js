import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: {},
  list: [],
  customer: [],
};

const CustomerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setTotal(state, action) {
      state.total = action.payload;
    },
    setList(state, action) {
      state.list = action.payload;
    },
    setCustomerDetail(state, action) {
      state.customer = action.payload;
    },
    resetCustomerDetail(state) {
      state.customer = [];
    },
    removeCustomer(state, action) {
      state.list = state.list.filter((item) => item._id !== action.payload);
    },
  },
});

export const {
  setList,
  setTotal,
  setCustomerDetail,
  resetCustomerDetail,
  removeCustomer,
} = CustomerSlice.actions;
export default CustomerSlice.reducer;
