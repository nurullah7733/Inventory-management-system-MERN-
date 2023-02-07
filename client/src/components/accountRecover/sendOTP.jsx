import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtpEmailForForgetPassword } from "../../APIRequest/userApi";

const SendOTP = () => {
  let navigate = useNavigate();

  let emailRef = useRef();

  const handleSumbit = async () => {
    let email = emailRef.value;
    let result = await sendOtpEmailForForgetPassword(email);
    if (result === true) {
      navigate("/verify-otp");
    }
  };

  return (
    <Fragment>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90  p-4">
              <div className="card-body">
                <h4>EMAIL ADDRESS</h4>
                <br />
                <label>Your email address</label>
                <input
                  ref={(input) => (emailRef = input)}
                  placeholder="User Email"
                  className="form-control animated fadeInUp"
                  type="email"
                />
                <br />
                <button
                  onClick={handleSumbit}
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

export default SendOTP;
