import React, { lazy, Suspense } from "react";
import MasterLayout from "../../components/masterLayout/masterLayout";
import LazyLoader from "../../components/masterLayout/lazyLoader";
const Expense = lazy(() => import("../../components/expense/expense"));

const ExpensePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Expense />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ExpensePage;
