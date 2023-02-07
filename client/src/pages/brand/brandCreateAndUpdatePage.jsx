import React, { lazy, Suspense } from "react";
import MasterLayout from "../../components/masterLayout/masterLayout";
import LazyLoader from "../../components/masterLayout/lazyLoader";
const BrandCreateAndUpdate = lazy(() =>
  import("../../components/brand/brandCreateAndUpdate")
);

const BrandCreateAndUpdatePage = () => {
  return (
    <div>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <BrandCreateAndUpdate />
        </Suspense>
      </MasterLayout>
    </div>
  );
};

export default BrandCreateAndUpdatePage;
