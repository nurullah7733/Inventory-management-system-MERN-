import React, { Suspense, lazy } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
import MasterLayout from "../../components/masterLayout/masterLayout";
const CreateSale = lazy(() => import("../../components/sale/createSale"));

const SaleCreatePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <CreateSale />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default SaleCreatePage;
