import React, { lazy, Suspense } from "react";
import MasterLayout from "../../components/masterLayout/masterLayout";
import LazyLoader from "../../components/masterLayout/lazyLoader";
let SaleReport = lazy(() => import("../../components/report/saleReport"));

const SaleReportPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <SaleReport />
      </Suspense>
    </MasterLayout>
  );
};

export default SaleReportPage;
