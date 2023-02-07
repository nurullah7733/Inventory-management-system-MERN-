const router = require("express").Router();
const authVerifyMiddleware = require("../middlewares/authVerifyMiddleware");
const {
  Registration,
  CreateNewPassword,
  Login,
  UserDetails,
  UserEmailVerifyAndSendMail,
  UserUpdate,
  VerifyOTP,
} = require("../controllers/user/userController");

const {
  createBrand,
  dropDownBrands,
  listBrands,
  updateBrand,
  deleteBrand,
  getBrandDetailById,
} = require("../controllers/brands/brandsController");

const {
  createCategory,
  dropDownCategory,
  listCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} = require("../controllers/categories/categoryController");

const {
  createCustomer,
  dropDownCustomer,
  listCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
} = require("../controllers/customers/customerController");

const {
  createSupplier,
  dropDownSupplier,
  listSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierById,
} = require("../controllers/supplier/supplierController");

const {
  createExpenseType,
  dropDownExpenseType,
  listExpenseType,
  updateExpenseType,
  deleteExpenseType,
  getExpenseTypeById,
} = require("../controllers/expense/expenseTypeController");

const {
  createExpense,
  updateExpense,
  listExpense,
  deleteExpense,
  expenseReport,
  getExpenseDetailById,
  expenseSummary,
} = require("../controllers/expense/expenseController");

const {
  createProduct,
  updateProduct,
  listProducts,
  deleteProduct,
  getProductDetailById,
  productDropdownList,
} = require("../controllers/products/productController");
const {
  createPurchase,
  listPurchaseSummary,
  deletePurchase,
  PurchaseReport,
  PurchaseSummary,
} = require("../controllers/purchases/purchaseController");
const {
  createSales,
  salesList,
  deleteSales,
  reportSales,
  SalesSummary,
} = require("../controllers/sales/salesController");
const {
  createReturn,
  ReturnList,
  deleteReturn,
  ReturnReport,
  ReturnSummary,
} = require("../controllers/return/returnController");

// User Api
router.post("/registration", Registration);
router.post("/login", Login);
router.get("/user-details", authVerifyMiddleware, UserDetails);
router.post("/user-update", authVerifyMiddleware, UserUpdate);
router.get("/forget-password/:email", UserEmailVerifyAndSendMail);
router.get("/verify-otp/:email/:otp", VerifyOTP);
router.post("/create-new-password", CreateNewPassword);

// Brands Api
router.post("/create-brand", authVerifyMiddleware, createBrand);
router.get("/all-brand", authVerifyMiddleware, dropDownBrands);
router.get(
  "/list-brands/:pageNo/:perPage/:searchKeyword",
  authVerifyMiddleware,
  listBrands
);
router.post("/update-brand/:id", authVerifyMiddleware, updateBrand);
router.get("/delete-brand/:id", authVerifyMiddleware, deleteBrand);
router.get("/brand-detail/:id", authVerifyMiddleware, getBrandDetailById);

// Category Api
router.post("/create-category", authVerifyMiddleware, createCategory);
router.get("/all-category", authVerifyMiddleware, dropDownCategory);
router.get(
  "/list-categories/:pageNo/:perPage/:searchKeyword",
  authVerifyMiddleware,
  listCategory
);
router.post("/update-category/:id", authVerifyMiddleware, updateCategory);
router.get("/category-detail/:id", authVerifyMiddleware, getCategoryById);
router.get("/delete-category/:id", authVerifyMiddleware, deleteCategory);

// Customer Api
router.post("/create-customer", authVerifyMiddleware, createCustomer);
router.get("/all-customer", authVerifyMiddleware, dropDownCustomer);
router.get(
  "/list-customers/:pageNo/:perPage/:searchKeyword",
  authVerifyMiddleware,
  listCustomer
);
router.post("/update-customer/:id", authVerifyMiddleware, updateCustomer);
router.get("/delete-customer/:id", authVerifyMiddleware, deleteCustomer);
router.get("/get-customer-details/:id", authVerifyMiddleware, getCustomerById);

// Supplier Api
router.post("/create-supplier", authVerifyMiddleware, createSupplier);
router.get("/all-supplier", authVerifyMiddleware, dropDownSupplier);
router.get(
  "/list-suppliers/:pageNo/:perPage/:searchKeyword",
  authVerifyMiddleware,
  listSupplier
);
router.post("/update-supplier/:id", authVerifyMiddleware, updateSupplier);
router.get("/delete-supplier/:id", authVerifyMiddleware, deleteSupplier);
router.get("/get-supplier/:id", authVerifyMiddleware, getSupplierById);

// ExpenseType Api
router.post("/create-expense-type", authVerifyMiddleware, createExpenseType);
router.get("/all-expense-type", authVerifyMiddleware, dropDownExpenseType);
router.get(
  "/list-expense-type/:pageNo/:perPage/:searchKeyword",
  authVerifyMiddleware,
  listExpenseType
);
router.post(
  "/update-expense-type/:id",
  authVerifyMiddleware,
  updateExpenseType
);
router.get("/delete-expense-type/:id", authVerifyMiddleware, deleteExpenseType);
router.get(
  "/expense-type-detail/:id",
  authVerifyMiddleware,
  getExpenseTypeById
);

// Expense Api
router.post("/create-expense", authVerifyMiddleware, createExpense);
router.get("/expense-detail/:id", authVerifyMiddleware, getExpenseDetailById);
router.get(
  "/list-expense/:pageNo/:perPage/:searchKeyword",
  authVerifyMiddleware,
  listExpense
);
router.post("/update-expense/:id", authVerifyMiddleware, updateExpense);
router.get("/delete-expense/:id", authVerifyMiddleware, deleteExpense);
router.post("/expense-report", authVerifyMiddleware, expenseReport);
router.get("/expense-summary", authVerifyMiddleware, expenseSummary);

// Products Api
router.post("/create-product", authVerifyMiddleware, createProduct);
router.get(
  "/list-product/:pageNo/:perPage/:searchKeyword",
  authVerifyMiddleware,
  listProducts
);
router.get("/all-product", authVerifyMiddleware, productDropdownList);
router.post("/update-product/:id", authVerifyMiddleware, updateProduct);
router.get("/delete-product/:id", authVerifyMiddleware, deleteProduct);
router.get("/product-detail/:id", authVerifyMiddleware, getProductDetailById);

// purchase Api
router.post("/create-purchase", authVerifyMiddleware, createPurchase);
router.get(
  "/list-purchase-product/:pageNo/:perPage/:searchKeyword",
  authVerifyMiddleware,
  listPurchaseSummary
);
router.get("/delete-purchase/:id", authVerifyMiddleware, deletePurchase);
router.post("/purchase-report", authVerifyMiddleware, PurchaseReport);
router.get("/purchase-summary", authVerifyMiddleware, PurchaseSummary);

// sales Api
router.post("/create-sales", authVerifyMiddleware, createSales);
router.get(
  "/sales-list/:pageNo/:perPage/:searchKeyword",
  authVerifyMiddleware,
  salesList
);
router.get("/sale-delete/:id", authVerifyMiddleware, deleteSales);
router.post("/sales-report", authVerifyMiddleware, reportSales);
router.get("/sales-summary", authVerifyMiddleware, SalesSummary);

// Return Api
router.post("/create-return", authVerifyMiddleware, createReturn);
router.get(
  "/return-list/:pageNo/:perPage/:searchKeyword",
  authVerifyMiddleware,
  ReturnList
);
router.get("/return-delete/:id", authVerifyMiddleware, deleteReturn);
router.post("/return-report", authVerifyMiddleware, ReturnReport);
router.get("/return-summary", authVerifyMiddleware, ReturnSummary);

module.exports = router;
