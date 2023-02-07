import React, { Fragment, useRef } from "react";
import { IsEmpty } from "../../helper/formValidation/formValidation";

import { useNavigate } from "react-router-dom";
import { ErrorToast } from "../../helper/notificationAlert/notificationAlert";
import { getEmail, getOtp } from "../../helper/sessionHelper/sessionHelper";
import { createNewPassword } from "../../APIRequest/userApi";

const CreatePassword = () => {
  let newPasswordRef,
    newComfirmPasswordRef = useRef();

  let navigate = useNavigate();

  const handleSubmit = async () => {
    let newPassword = newPasswordRef.value;
    let confirmPassword = newComfirmPasswordRef.value;
    console.log(newPassword);
    if (!IsEmpty(newPassword)) {
      ErrorToast("New Password is required!");
    } else if (!IsEmpty(confirmPassword)) {
      ErrorToast("Confirm Password is required!");
    } else if (newPassword !== confirmPassword) {
      ErrorToast("Confirm Password is does not match!");
    } else {
      let result = await createNewPassword(getEmail(), getOtp(), newPassword);
      if (result === true) {
        navigate("/login");
      }
    }
  };

  return (
    <Fragment>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90 p-4">
              <div className="card-body">
                <h4>SET NEW PASSWORD</h4>
                <br />
                <label>Your email address</label>
                <input
                  readOnly={true}
                  defaultValue={getEmail()}
                  placeholder="User Email"
                  className="form-control animated fadeInUp"
                  type="email"
                />
                <br />
                <label>New Password</label>
                <input
                  ref={(input) => (newPasswordRef = input)}
                  placeholder="New Password"
                  className="form-control animated fadeInUp"
                  type="password"
                />
                <br />
                <label>Confirm Password</label>
                <input
                  ref={(input) => (newComfirmPasswordRef = input)}
                  placeholder="Confirm Password"
                  className="form-control animated fadeInUp"
                  type="password"
                />
                <br />
                <button
                  onClick={handleSubmit}
                  className="btn w-100 animated fadeInUp float-end btn-primary"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreatePassword;
