import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryTotal: [],
  categoryList: [],
  categoryDetail: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryTotal(state, action) {
      state.categoryTotal = action.payload;
    },
    setCategoryList(state, action) {
      state.categoryList = action.payload;
    },
    setCategoryDetail(state, action) {
      state.categoryDetail = action.payload;
    },
    resetCategoryDetail(state) {
      state.categoryDetail = [];
    },
    removeFromCategoryList(state, action) {
      state.categoryList = state.categoryList.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  removeFromCategoryList,
  resetCategoryDetail,
  setCategoryDetail,
  setCategoryList,
  setCategoryTotal,
} = categorySlice.actions;
export default categorySlice.reducer;
