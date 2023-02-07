import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FullscreenLoader from "./components/masterLayout/fullScreenLoader";
import SupplierCreateAndUpdatePage from "./pages/supplier/supplierPage";
import SupplierListPage from "./pages/supplier/supplierListPage";
import { getToken } from "./helper/sessionHelper/sessionHelper";
import NotFoundPage from "./pages/404/notFoundPage";
import CreatePasswordPage from "./pages/acountRecover/createPasswordPage";
import ForgetPassword from "./pages/acountRecover/forgetPassword";
import VerifyOtpPage from "./pages/acountRecover/verifyOtpPage";
import CustomerPage from "./pages/customer/customerCreatePage";
import CustomerListPage from "./pages/customer/customerListPage";
import Home from "./pages/home/homePage";
import LoginPage from "./pages/login/loginPage";
import ProfilePage from "./pages/profile/profile";
import RegistrationPage from "./pages/registration/registrationPage";
import ExpenseTypePage from "./pages/expenseType/expenseTypePage";
import ExpenseTypeListPage from "./pages/expenseType/expenseTypeListPage";
import ExpensePage from "./pages/expense/expensePage";
import ExpenseListPage from "./pages/expense/expenseListPage";
import BrandCreateAndUpdatePage from "./pages/brand/brandCreateAndUpdatePage";
import BrandListPage from "./pages/brand/brandListPage";
import CategoryCreateAndUpdatePage from "./pages/category/categoryCreateAndUpdatePage";
import CategoryListPage from "./pages/category/categoryListPage";
import ProductCreatePage from "./pages/product/createProductPage";
import ProductListPage from "./pages/product/productListPage";
import PurchaseCreatePage from "./pages/purchase/createPurchasePage";
import PurchaseListPage from "./pages/purchase/purchaseListPage";
import SaleListPage from "./pages/sale/saleListPage";
import SaleCreatePage from "./pages/sale/createSalePage";
import ReturnListPage from "./pages/return/returnListPage";
import ReturnCreatePage from "./pages/return/createReturnPage";
import ExpenseReportPage from "./pages/reportPage/expenseReportPage";
import ReturnReportPage from "./pages/reportPage/returnReportPage";
import PurchaseReportPage from "./pages/reportPage/purchaseReportPage";
import SaleReportPage from "./pages/reportPage/saleReportPage";

function App() {
  let token = getToken();

  if (token) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/customer-list" element={<CustomerListPage />} />
            {/* supplier */}
            <Route path="/supplier" element={<SupplierCreateAndUpdatePage />} />
            <Route path="/supplier-list" element={<SupplierListPage />} />
            {/* expense Type*/}
            <Route path="/expense-type" element={<ExpenseTypePage />} />
            <Route
              path="/expense-type-list"
              element={<ExpenseTypeListPage />}
            />
            {/* expense */}
            <Route path="/expense" element={<ExpensePage />} />
            <Route path="/expense-list" element={<ExpenseListPage />} />

            {/* brand */}
            <Route path="/brand" element={<BrandCreateAndUpdatePage />} />
            <Route path="/brand-list" element={<BrandListPage />} />

            {/* Category */}
            <Route path="/category" element={<CategoryCreateAndUpdatePage />} />
            <Route path="/category-list" element={<CategoryListPage />} />

            {/* Product */}
            <Route path="/product" element={<ProductCreatePage />} />
            <Route path="/product-list" element={<ProductListPage />} />

            {/* Purchase */}
            <Route path="/purchase" element={<PurchaseCreatePage />} />
            <Route path="/purchase-list" element={<PurchaseListPage />} />

            {/* Sale */}
            <Route path="/sale" element={<SaleCreatePage />} />
            <Route path="/sale-list" element={<SaleListPage />} />

            {/* Sale */}
            <Route path="/return" element={<ReturnCreatePage />} />
            <Route path="/return-list" element={<ReturnListPage />} />

            {/* Report Page */}
            <Route path="/expense-report" element={<ExpenseReportPage />} />
            <Route path="/return-report" element={<ReturnReportPage />} />
            <Route path="/purchase-report" element={<PurchaseReportPage />} />
            <Route path="/sale-report" element={<SaleReportPage />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
      </>
    );
  } else {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
            <Route
              path="/create-new-password"
              element={<CreatePasswordPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
      </>
    );
  }
}

export default App;
