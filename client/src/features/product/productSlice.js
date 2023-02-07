import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryDropdownList: [],
  brandDropdownList: [],
  productListTotal: [],
  productList: [],
  formValue: {
    categoryId: "",
    brandId: "",
    name: "",
    unit: "",
    details: "",
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategoryDropdownList(state, action) {
      state.categoryDropdownList = action.payload;
    },
    setBrandDropdownList(state, action) {
      state.brandDropdownList = action.payload;
    },
    setProductListTotal(state, action) {
      state.productListTotal = action.payload;
    },
    setProductList(state, action) {
      state.productList = action.payload;
    },
    removeProductList(state, action) {
      state.productList = state.productList.filter(
        (item) => item._id !== action.payload
      );
    },
    setFormValue(state, action) {
      state.formValue[`${action.payload.Name}`] = action.payload.Value;
    },
    resetFormValue(state) {
      Object.keys(state.formValue).forEach(
        (item) => (state.formValue[item] = "")
      );
    },
  },
});

export const {
  setBrandDropdownList,
  setCategoryDropdownList,
  resetFormValue,
  setFormValue,
  setProductList,
  setProductListTotal,
  removeProductList,
} = productSlice.actions;
export default productSlice.reducer;
