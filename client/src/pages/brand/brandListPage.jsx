import React, { lazy, Suspense } from "react";
import MasterLayout from "../../components/masterLayout/masterLayout";
import LazyLoader from "../../components/masterLayout/lazyLoader";
const BrandList = lazy(() => import("../../components/brand/brandList"));

const BrandListPage = () => {
  return (
    <div>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <BrandList />
        </Suspense>
      </MasterLayout>
    </div>
  );
};

export default BrandListPage;
