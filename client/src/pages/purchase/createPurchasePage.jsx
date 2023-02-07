import React, { Suspense, lazy } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
import MasterLayout from "../../components/masterLayout/masterLayout";
const CreatePurchase = lazy(() =>
  import("../../components/purchase/createPurchase")
);

const PurchaseCreatePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <CreatePurchase />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default PurchaseCreatePage;
