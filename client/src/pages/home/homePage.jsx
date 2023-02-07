import React, { lazy, Suspense } from "react";
import MasterLayout from "../../components/masterLayout/masterLayout";
import LazyLoader from "../../components/masterLayout/lazyLoader";
const Dashboard = lazy(() => import("../../components/dashboard/dashboard"));

const Home = () => {
  return (
    <div>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Dashboard />
        </Suspense>
      </MasterLayout>
    </div>
  );
};

export default Home;
