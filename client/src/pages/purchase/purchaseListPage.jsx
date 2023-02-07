import React, { Suspense, lazy } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
import MasterLayout from "../../components/masterLayout/masterLayout";
const PurchaseList = lazy(() =>
  import("../../components/purchase/purchaseList")
);

const PurchaseListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <PurchaseList />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default PurchaseListPage;
