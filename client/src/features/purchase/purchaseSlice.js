import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  supplierDropdownList: [],
  productDropdownList: [],
  purchaseFormValue: {
    supplierId: "",
    vatTax: "",
    discount: "",
    otherCost: "",
    shippingCost: "",
    grandTotal: 0,
    note: "",
  },
  purchaseProductList: [],

  purchaseListTotal: [],
  purchaseList: [],
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setSupplierDropdownList(state, action) {
      state.supplierDropdownList = action.payload;
    },
    setProductDropdownList(state, action) {
      state.productDropdownList = action.payload;
    },
    setPurchaseFormValue(state, action) {
      state.purchaseFormValue[action.payload.Name] = action.payload.Value;
    },
    setPurchaseFormValueGrandTotal(state, action) {
      state.purchaseFormValue.grandTotal = action.payload;
    },
    resetPurchaseFormValue(state) {
      state.purchaseFormValue = {
        supplierId: "",
        vatTax: "",
        discount: "",
        otherCost: "",
        shippingCost: "",
        grandTotal: 0,
        note: "",
      };
    },
    setPurchaseProductList(state, action) {
      state.purchaseProductList.push(action.payload);
    },
    removePurchaseProductList(state, action) {
      state.purchaseProductList.splice(action.payload, 1);
    },
    setPurchaseListTotal(state, action) {
      state.purchaseListTotal = action.payload;
    },
    setPurchaseList(state, action) {
      state.purchaseList = action.payload;
    },
    resetPurchaseList(state) {
      state.purchaseProductList = [];
    },
    removePurchaseList(state, action) {
      state.purchaseList = state.purchaseList.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  setProductDropdownList,
  resetPurchaseFormValue,
  resetPurchaseList,
  removePurchaseProductList,
  setPurchaseFormValue,
  setPurchaseProductList,
  setSupplierDropdownList,
  setPurchaseList,
  removePurchaseList,
  setPurchaseFormValueGrandTotal,
  setPurchaseListTotal,
} = purchaseSlice.actions;
export default purchaseSlice.reducer;
