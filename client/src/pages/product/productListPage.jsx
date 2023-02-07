import React, { Suspense, lazy } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
import MasterLayout from "../../components/masterLayout/masterLayout";
const ProductList = lazy(() => import("../../components/product/productList"));

const ProductListPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ProductList />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ProductListPage;
