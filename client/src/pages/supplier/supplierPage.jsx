import React, { Suspense, lazy } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
import MasterLayout from "../../components/masterLayout/masterLayout";
const Supplier = lazy(() =>
  import("../../components/supplier/supplierCreateAndUpdate")
);

const SupplierPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Supplier />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default SupplierPage;
