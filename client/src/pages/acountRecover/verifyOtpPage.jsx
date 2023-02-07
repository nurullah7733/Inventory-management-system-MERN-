import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
const VerifyOtp = lazy(() =>
  import("../../components/accountRecover/verifyOTP")
);
const VerifyOtpPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <VerifyOtp />
      </Suspense>
    </>
  );
};

export default VerifyOtpPage;
