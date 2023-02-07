import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
const Registration = lazy(() =>
  import("../../components/registration/registraion")
);

const RegistrationPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <Registration />
      </Suspense>
    </>
  );
};

export default RegistrationPage;
