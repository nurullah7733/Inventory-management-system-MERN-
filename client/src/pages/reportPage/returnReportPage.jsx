import React, { lazy, Suspense } from "react";
import MasterLayout from "../../components/masterLayout/masterLayout";
import LazyLoader from "../../components/masterLayout/lazyLoader";
let ReturnReport = lazy(() => import("../../components/report/returnReport"));

const ReturnReportPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <ReturnReport />
      </Suspense>
    </MasterLayout>
  );
};

export default ReturnReportPage;
