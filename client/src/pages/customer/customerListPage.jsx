import React, { Suspense, lazy } from "react";

import LazyLoader from "../../components/masterLayout/lazyLoader";
import MasterLayout from "../../components/masterLayout/masterLayout";
const CustomerList = lazy(() =>
  import("../../components/customer/customerList")
);

const CustomerListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <CustomerList />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default CustomerListPage;
