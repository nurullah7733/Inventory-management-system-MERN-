import React, { lazy, Suspense } from "react";
import MasterLayout from "../../components/masterLayout/masterLayout";
import LazyLoader from "../../components/masterLayout/lazyLoader";
const CategoryList = lazy(() =>
  import("../../components/category/categoryList")
);

const CategoryListPage = () => {
  return (
    <div>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <CategoryList />
        </Suspense>
      </MasterLayout>
    </div>
  );
};

export default CategoryListPage;
