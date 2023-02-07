import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
const CreateNewPassword = lazy(() =>
  import("../../components/accountRecover/createPassword")
);

const CreatePasswordPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <CreateNewPassword />
      </Suspense>
    </>
  );
};

export default CreatePasswordPage;
