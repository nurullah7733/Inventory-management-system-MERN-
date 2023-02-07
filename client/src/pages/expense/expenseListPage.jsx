import React, { lazy, Suspense } from "react";
import MasterLayout from "../../components/masterLayout/masterLayout";
import LazyLoader from "../../components/masterLayout/lazyLoader";
const ExpenseList = lazy(() => import("../../components/expense/expenseList"));

const ExpenseListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ExpenseList />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ExpenseListPage;
