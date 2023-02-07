import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
import MasterLayout from "../../components/masterLayout/masterLayout";
const ExpenseType = lazy(() =>
  import("../../components/expenseType/expenseType")
);

const ExpenseTypePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ExpenseType />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ExpenseTypePage;
