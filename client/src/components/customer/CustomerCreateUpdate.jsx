import React, { Fragment, useEffect, useState } from "react";
import { useRef } from "react";
import {
  IsEmail,
  IsEmpty,
  IsMobileNumber,
} from "../../helper/formValidation/formValidation";
import { useNavigate } from "react-router-dom";
import {
  customerCreate,
  getCustomerDetailById,
  updateCustomer,
} from "../../APIRequest/customerApi";
import { ErrorToast } from "../../helper/notificationAlert/notificationAlert";
import { useSelector } from "react-redux";
import { resetCustomerDetail } from "../../features/customer/customerSlice";
import store from "../../app/store";

const CustomerCreateUpdate = () => {
  let navigate = useNavigate();
  let customerOldData = useSelector((state) => state.customer.customer[0]);
  let [id, setId] = useState("0");

  let customerRef,
    mobileRef,
    emailRef,
    addressRef = useRef();

  const handleSubmit = async () => {
    let customerName = customerRef.value;
    let email = emailRef.value;
    let mobile = mobileRef.value;
    let address = addressRef.value;
    if (!IsEmpty(customerName)) {
      ErrorToast("Customer Name Required");
    } else if (!IsEmpty(email)) {
      ErrorToast("Customer Email is required");
    } else if (!IsEmail(email)) {
      ErrorToast("Invalid Email Address");
    } else if (!IsMobileNumber(mobile)) {
      ErrorToast("Invalid Mobile Number");
    } else if (!IsEmpty(address)) {
      ErrorToast("Address is Required");
    } else {
      if (id !== null && id !== "0") {
        (async () => {
          let result = await updateCustomer(
            customerName,
            mobile,
            email,
            address,
            id
          );
          if (result === true) {
            navigate("/customer-list");
          }
        })();
      } else {
        let result = await customerCreate(customerName, email, mobile, address);
        if (result === true) {
          navigate("/customer-list");
        }
      }
    }
  };

  // for Update data
  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    setId(params.get("id"));
    if (id !== null && id !== "0") {
      (async () => {
        await getCustomerDetailById(id);
      })();
    } else {
      store.dispatch(resetCustomerDetail());
    }
  }, [id]);

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <h5>Save Customer</h5>
                  <hr className="bg-light" />

                  <div className="col-4 p-2">
                    <label className="form-label">Customer Name</label>

                    <input
                      className="form-control form-control-sm"
                      type="text"
                      ref={(input) => (customerRef = input)}
                      key={Math.random()}
                      defaultValue={
                        customerOldData !== undefined
                          ? customerOldData.customerName
                          : ""
                      }
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label className="form-label">Mobile No</label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      ref={(input) => (mobileRef = input)}
                      key={Math.random()}
                      defaultValue={
                        customerOldData !== undefined
                          ? customerOldData.phone
                          : ""
                      }
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label className="form-label">Email </label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      ref={(input) => (emailRef = input)}
                      key={Math.random()}
                      defaultValue={
                        customerOldData !== undefined
                          ? customerOldData.email
                          : ""
                      }
                    />
                  </div>
                  <div className="col-12 p-2">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control form-control-sm"
                      rows={2}
                      ref={(input) => (addressRef = input)}
                      key={Math.random()}
                      defaultValue={
                        customerOldData !== undefined
                          ? customerOldData.address
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 p-2">
                    <button
                      onClick={handleSubmit}
                      className="btn btn-sm my-3 btn-success"
                    >
                      {customerOldData !== undefined ? "Upate" : "Create"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerCreateUpdate;
