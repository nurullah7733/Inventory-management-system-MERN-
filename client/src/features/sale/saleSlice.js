import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerDropdownList: [],
  productDropdownList: [],
  saleFormValue: {
    customerId: "",
    vatTax: "",
    discount: "",
    otherCost: "",
    shippingCost: "",
    grandTotal: 0,
    note: "",
  },
  saleList: [],
  saleListTotal: [],
  saleAddToCardList: [],
};

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    setCustomerDropdownList(state, action) {
      state.customerDropdownList = action.payload;
    },
    setProductDropdownList(state, action) {
      state.productDropdownList = action.payload;
    },
    setSaleFormValue(state, action) {
      state.saleFormValue[action.payload.Name] = action.payload.Value;
    },
    setSaleFormValueGrandTotal(state, action) {
      state.saleFormValue.grandTotal = action.payload;
    },
    resetSaleFormValue(state) {
      state.saleFormValue = {
        customerId: "",
        vatTax: "",
        discount: "",
        otherCost: "",
        shippingCost: "",
        grandTotal: 0,
        note: "",
      };
    },
    setSaleProductListAddToCard(state, action) {
      state.saleAddToCardList.push(action.payload);
    },
    resetSaleProductListAddToCard(state) {
      state.saleAddToCardList = [];
    },
    removesetSaleProductListAddToCard(state, action) {
      state.saleAddToCardList.splice(action.payload, 1);
    },
    setSaleListTotal(state, action) {
      state.saleListTotal = action.payload;
    },
    setSaleList(state, action) {
      state.saleList = action.payload;
    },
    removeSaleList(state, action) {
      state.saleList = state.saleList.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  removeSaleList,
  resetSaleFormValue,
  resetSaleProductListAddToCard,
  removesetSaleProductListAddToCard,
  setCustomerDropdownList,
  setProductDropdownList,
  setSaleFormValue,
  setSaleFormValueGrandTotal,
  setSaleList,
  setSaleListTotal,
  setSaleProductListAddToCard,
} = saleSlice.actions;
export default saleSlice.reducer;
