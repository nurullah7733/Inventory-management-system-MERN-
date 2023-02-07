import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/masterLayout/lazyLoader";
const Login = lazy(() => import("../../components/login/login"));

const LoginPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <Login />
      </Suspense>
    </>
  );
};

export default LoginPage;
