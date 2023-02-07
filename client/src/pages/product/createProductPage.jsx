import React, { Suspense, lazy } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
import MasterLayout from "../../components/masterLayout/masterLayout";
const Product = lazy(() =>
  import("../../components/product/productCreateAndUpdate")
);

const ProductCreatePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Product />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ProductCreatePage;
