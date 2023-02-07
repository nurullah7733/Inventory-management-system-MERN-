import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brandTotal: [],
  brandList: [],
  brandDetail: [],
};

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setBrandTotal(state, action) {
      state.brandTotal = action.payload;
    },
    setBrandList(state, action) {
      state.brandList = action.payload;
    },
    setBrandDetail(state, action) {
      state.brandDetail = action.payload;
    },
    resetBrandDetail(state) {
      state.brandDetail = [];
    },
    removeFromBrandList(state, action) {
      state.brandList = state.brandList.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  setBrandList,
  setBrandTotal,
  removeFromBrandList,
  setBrandDetail,
  resetBrandDetail,
} = brandSlice.actions;
export default brandSlice.reducer;
