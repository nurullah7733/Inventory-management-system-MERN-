import React, { lazy, Suspense } from "react";
import MasterLayout from "../../components/masterLayout/masterLayout";
import LazyLoader from "../../components/masterLayout/lazyLoader";
let ExpenseReport = lazy(() => import("../../components/report/expenseReport"));

const ExpenseReportPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <ExpenseReport />
      </Suspense>
    </MasterLayout>
  );
};

export default ExpenseReportPage;
