import React, { lazy, Suspense } from "react";
import MasterLayout from "../../components/masterLayout/masterLayout";
import LazyLoader from "../../components/masterLayout/lazyLoader";
const ExpenseTypeList = lazy(() =>
  import("../../components/expenseType/expenseList")
);

const ExpenseTypeListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ExpenseTypeList />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ExpenseTypeListPage;
