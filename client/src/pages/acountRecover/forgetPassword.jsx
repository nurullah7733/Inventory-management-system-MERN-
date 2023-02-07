import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
const SendOTP = lazy(() => import("../../components/accountRecover/sendOTP"));
const ForgetPassword = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <SendOTP />
      </Suspense>
    </>
  );
};

export default ForgetPassword;
