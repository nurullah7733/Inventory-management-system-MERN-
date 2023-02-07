import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "../../APIRequest/userApi";
import {
  getBase64,
  IsEmpty,
  IsEmail,
  IsMobileNumber,
} from "../../helper/formValidation/formValidation";
import { ErrorToast } from "../../helper/notificationAlert/notificationAlert";

const Profile = ({ userDetails }) => {
  let navigate = useNavigate();
  let emailRef,
    firstNameRef,
    lastNameRef,
    mobileRef,
    passwordRef,
    userImgRef,
    userImgView = useRef();

  const convertImgToBase64 = () => {
    let userInputImg = userImgRef.files[0];
    getBase64(userInputImg).then((base64Data) => {
      userImgView.src = base64Data;
    });
  };

  const handleSubmit = async () => {
    let email = emailRef.value;
    let firstName = firstNameRef.value;
    let lastName = lastNameRef.value;
    let mobile = mobileRef.value;
    let password = passwordRef.value;
    let photo = userImgView.src;

    if (!IsEmpty(email)) {
      ErrorToast("Email is required!");
    } else if (!IsEmail(email)) {
      ErrorToast("Valid Email is required!");
    } else if (!IsEmpty(firstName)) {
      ErrorToast("Frist name is required!");
    } else if (!IsEmpty(lastName)) {
      ErrorToast("Last name is required!");
    } else if (!IsEmpty(mobile)) {
      ErrorToast("Mobile number is required!");
    } else if (!IsMobileNumber(mobile)) {
      ErrorToast("Valid Mobile number is required!");
    } else if (!IsEmpty(password)) {
      ErrorToast("Password is required!");
    } else {
      let result = await updateUserInfo(
        email,
        password,
        firstName,
        lastName,
        mobile,
        photo
      );
      if (result === true) navigate("/");
    }
  };
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                <img
                  ref={(input) => (userImgView = input)}
                  className="icon-nav-img-lg"
                  src={userDetails.photo}
                  alt=""
                />
                <hr />
                <div className="row">
                  <div className="col-4 p-2">
                    <label>Profile Picture</label>
                    <input
                      ref={(input) => (userImgRef = input)}
                      placeholder="User Email"
                      className="form-control animated fadeInUp"
                      type="file"
                      onChange={convertImgToBase64}
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Email Address</label>
                    <input
                      key={Date.now()}
                      readOnly={true}
                      ref={(input) => (emailRef = input)}
                      placeholder="User Email"
                      className="form-control animated fadeInUp"
                      type="email"
                      defaultValue={userDetails.email}
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>First Name</label>
                    <input
                      key={Date.now()}
                      ref={(input) => (firstNameRef = input)}
                      placeholder="First Name"
                      className="form-control animated fadeInUp"
                      type="text"
                      defaultValue={userDetails.firstName}
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Last Name</label>
                    <input
                      key={Date.now()}
                      ref={(input) => (lastNameRef = input)}
                      placeholder="Last Name"
                      className="form-control animated fadeInUp"
                      type="text"
                      defaultValue={userDetails.lastName}
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Mobile</label>
                    <input
                      key={Date.now()}
                      ref={(input) => (mobileRef = input)}
                      placeholder="Mobile"
                      className="form-control animated fadeInUp"
                      type="mobile"
                      defaultValue={userDetails.mobile}
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Password</label>
                    <input
                      key={Date.now()}
                      ref={(input) => (passwordRef = input)}
                      placeholder="User Password"
                      className="form-control animated fadeInUp"
                      type="password"
                      defaultValue={userDetails.password}
                    />
                  </div>
                  <div className="col-4 p-2">
                    <button
                      onClick={handleSubmit}
                      className="btn w-100 float-end btn-primary animated fadeInUp"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
