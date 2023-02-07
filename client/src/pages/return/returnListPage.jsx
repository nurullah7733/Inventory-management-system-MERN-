import React, { Suspense, lazy } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
import MasterLayout from "../../components/masterLayout/masterLayout";
const ReturnList = lazy(() => import("../../components/return/returnList"));

const ReturnListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ReturnList />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ReturnListPage;
