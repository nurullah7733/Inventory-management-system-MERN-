import React, { Suspense, lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import MasterLayout from "../../components/masterLayout/masterLayout";
import LazyLoader from "../../components/masterLayout/lazyLoader";
import { getUserInfo } from "../../APIRequest/userApi";
const Profile = lazy(() => import("../../components/profile/profile"));

const ProfilePage = () => {
  const userDetails = useSelector((state) => state.userDetails.userDetails);

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Profile userDetails={userDetails} />
        </Suspense>
      </MasterLayout>
    </div>
  );
};

export default ProfilePage;
