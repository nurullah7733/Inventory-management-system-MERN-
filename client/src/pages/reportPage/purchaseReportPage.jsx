import React, { lazy, Suspense } from "react";
import MasterLayout from "../../components/masterLayout/masterLayout";
import LazyLoader from "../../components/masterLayout/lazyLoader";
let PurchaseReport = lazy(() =>
  import("../../components/report/purchaseReport")
);

const PurchaseReportPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <PurchaseReport />
      </Suspense>
    </MasterLayout>
  );
};

export default PurchaseReportPage;
