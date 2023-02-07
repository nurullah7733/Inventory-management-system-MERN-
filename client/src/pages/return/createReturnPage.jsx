import React, { Suspense, lazy } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
import MasterLayout from "../../components/masterLayout/masterLayout";
const ReturnSale = lazy(() => import("../../components/return/createReturn"));

const ReturnCreatePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ReturnSale />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ReturnCreatePage;
