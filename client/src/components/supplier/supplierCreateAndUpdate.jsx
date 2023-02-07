import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  createSupplierApi,
  getSupplierById,
  updateSupplier,
} from "../../APIRequest/supplierApi";
import {
  IsEmail,
  IsEmpty,
  IsMobileNumber,
} from "../../helper/formValidation/formValidation";
import { ErrorToast } from "../../helper/notificationAlert/notificationAlert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../../app/store";
import { resetSupplierDetail } from "../../features/supplier/supplierSlice";

const SupplierCreateAndUpdate = () => {
  let navigate = useNavigate();
  let supplierOldData = useSelector(
    (state) => state.supplier.supplierDetail[0]
  );

  let [id, setId] = useState("0");
  let supplierNameRef,
    mobileRef,
    emailRef,
    addressRef = useRef();
  const handleSubmit = async () => {
    let supplierName = supplierNameRef.value;
    let mobile = mobileRef.value;
    let email = emailRef.value;
    let address = addressRef.value;

    if (!IsEmpty(supplierName)) {
      ErrorToast("Supplier Name is Required");
    } else if (!IsEmpty(mobile)) {
      ErrorToast("Supplier Mobile is Required");
    } else if (!IsMobileNumber(mobile)) {
      ErrorToast("Invalid Mobile Number");
    } else if (!IsEmpty(email)) {
      ErrorToast("Email is Required");
    } else if (!IsEmail(email)) {
      ErrorToast("Invalid Email Address");
    } else if (!IsEmpty(address)) {
      ErrorToast("Address is Required");
    } else {
      if (id !== null && id !== "0") {
        let result = await updateSupplier(
          id,
          supplierName,
          mobile,
          email,
          address
        );
        if (result) {
          navigate("/supplier-list");
        }
      } else {
        let result = await createSupplierApi(
          supplierName,
          mobile,
          email,
          address
        );
        if (result) {
          navigate("/supplier-list");
        }
      }
    }
  };

  //update implementation
  useEffect(() => {
    // url path get editing id
    let params = new URLSearchParams(window.location.search);
    setId(params.get("id"));

    if (id !== null && id !== "0") {
      (async () => {
        await getSupplierById(id);
      })();
    } else {
      store.dispatch(resetSupplierDetail());
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
                  <h5>
                    {" "}
                    {supplierOldData !== undefined
                      ? "Update Supplier"
                      : "Create Supplier"}
                  </h5>
                  <hr className="bg-light" />

                  <div className="col-4 p-2">
                    <label className="form-label">Supplier Name</label>

                    <input
                      className="form-control form-control-sm"
                      type="text"
                      ref={(input) => (supplierNameRef = input)}
                      key={Math.random()}
                      defaultValue={
                        supplierOldData !== undefined
                          ? supplierOldData.name
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
                        supplierOldData !== undefined
                          ? supplierOldData.phone
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
                        supplierOldData !== undefined
                          ? supplierOldData.email
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
                        supplierOldData !== undefined
                          ? supplierOldData.address
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
                      {supplierOldData !== undefined
                        ? "Update Supplier"
                        : "Create Supplier"}
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

export default SupplierCreateAndUpdate;
