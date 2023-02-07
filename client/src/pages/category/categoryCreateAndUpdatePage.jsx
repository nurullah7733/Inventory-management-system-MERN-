import React, { lazy, Suspense } from "react";
import MasterLayout from "../../components/masterLayout/masterLayout";
import LazyLoader from "../../components/masterLayout/lazyLoader";
const CategoryCreateAndUpdate = lazy(() =>
  import("../../components/category/categoryCreateAndUpdate")
);

const CategoryCreateAndUpdatePage = () => {
  return (
    <div>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <CategoryCreateAndUpdate />
        </Suspense>
      </MasterLayout>
    </div>
  );
};

export default CategoryCreateAndUpdatePage;
