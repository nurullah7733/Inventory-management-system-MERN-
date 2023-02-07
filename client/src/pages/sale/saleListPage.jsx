import React, { Suspense, lazy } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
import MasterLayout from "../../components/masterLayout/masterLayout";
const SaleList = lazy(() => import("../../components/sale/saleList"));

const SaleListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <SaleList />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default SaleListPage;
