import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: {},
  list: [],
  supplierDetail: [],
};

const SupplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    setTotal(state, action) {
      state.total = action.payload;
    },
    setList(state, action) {
      state.list = action.payload;
    },
    setSupplierDetail(state, action) {
      state.supplierDetail = action.payload;
    },
    resetSupplierDetail(state) {
      state.supplierDetail = [];
    },
    removeSupplier(state, action) {
      state.list = state.list.filter((item) => item._id !== action.payload);
    },
  },
});

export const {
  removeSupplier,
  resetSupplierDetail,
  setList,
  setSupplierDetail,
  setTotal,
} = SupplierSlice.actions;
export default SupplierSlice.reducer;
