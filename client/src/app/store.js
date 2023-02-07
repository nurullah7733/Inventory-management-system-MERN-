import { configureStore } from "@reduxjs/toolkit";
import brandSlice from "../features/brand/brandSlice";
import categorySlice from "../features/category/categorySlice";
import customerSlice from "../features/customer/customerSlice";
import expenseSlice from "../features/expense/expenseSlice";
import expenseTypeSlice from "../features/expenseType/expenseTypeSlice";
import productSlice from "../features/product/productSlice";
import purchaseSlice from "../features/purchase/purchaseSlice";
import reportSlice from "../features/report/reportSlice";
import returnSlice from "../features/return/returnSlice";
import saleSlice from "../features/sale/saleSlice";
import settingsSlice from "../features/settings/settingsSlice";
import summarySlice from "../features/summary/summarySlice";
import supplierSlice from "../features/supplier/supplierSlice";
import userDetailsSlice from "../features/user/userDetailsSlice";
export default configureStore({
  reducer: {
    settings: settingsSlice,
    userDetails: userDetailsSlice,
    customer: customerSlice,
    supplier: supplierSlice,
    expenseType: expenseTypeSlice,
    expense: expenseSlice,
    brand: brandSlice,
    category: categorySlice,
    product: productSlice,
    report: reportSlice,
    purchase: purchaseSlice,
    sale: saleSlice,
    return: returnSlice,
    summary: summarySlice,
  },
});
