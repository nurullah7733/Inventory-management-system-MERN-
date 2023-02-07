import React, { Suspense, lazy } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
import MasterLayout from "../../components/masterLayout/masterLayout";
const SupplierList = lazy(() =>
  import("../../components/supplier/supplierList")
);

const SupplierListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <SupplierList />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default SupplierListPage;
