import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerDropdownList: [],
  productDropdownList: [],
  returnFormValue: {
    customerId: "",
    vatTax: "",
    discount: "",
    otherCost: "",
    shippingCost: "",
    grandTotal: 0,
    note: "",
  },
  returnList: [],
  returnListTotal: [],
  returnAddToCardList: [],
};

const returnSlice = createSlice({
  name: "return",
  initialState,
  reducers: {
    setCustomerDropdownList(state, action) {
      state.customerDropdownList = action.payload;
    },
    setProductDropdownList(state, action) {
      state.productDropdownList = action.payload;
    },
    setReturnFormValue(state, action) {
      state.returnFormValue[action.payload.Name] = action.payload.Value;
    },
    setReturnFormValueGrandTotal(state, action) {
      state.returnFormValue.grandTotal = action.payload;
    },
    resetReturnFormValue(state) {
      state.returnFormValue = {
        customerId: "",
        vatTax: "",
        discount: "",
        otherCost: "",
        shippingCost: "",
        grandTotal: 0,
        note: "",
      };
    },
    setReturnProductListAddToCard(state, action) {
      state.returnAddToCardList.push(action.payload);
    },
    resetReturnProductListAddToCard(state) {
      state.returnAddToCardList = [];
    },
    removesetReturnProductListAddToCard(state, action) {
      state.returnAddToCardList.splice(action.payload, 1);
    },
    setReturnListTotal(state, action) {
      state.returnListTotal = action.payload;
    },
    setReturnList(state, action) {
      state.returnList = action.payload;
    },
    removeReturnList(state, action) {
      state.returnList = state.returnList.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  removeReturnList,
  removesetReturnProductListAddToCard,
  resetReturnFormValue,
  resetReturnProductListAddToCard,
  setCustomerDropdownList,
  setProductDropdownList,
  setReturnFormValue,
  setReturnFormValueGrandTotal,
  setReturnList,
  setReturnListTotal,
  setReturnProductListAddToCard,
} = returnSlice.actions;
export default returnSlice.reducer;
