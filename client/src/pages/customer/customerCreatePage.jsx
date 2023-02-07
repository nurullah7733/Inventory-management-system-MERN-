import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
import MasterLayout from "../../components/masterLayout/masterLayout";
const CustomerCreateUpdate = lazy(() =>
  import("../../components/customer/CustomerCreateUpdate")
);

const CustomerPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <CustomerCreateUpdate />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default CustomerPage;
