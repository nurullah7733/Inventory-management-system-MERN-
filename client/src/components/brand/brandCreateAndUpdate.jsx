import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createBrand,
  getBrandDetailById,
  updateBrand,
} from "../../APIRequest/brandApi";
import store from "../../app/store";
import { resetBrandDetail } from "../../features/brand/brandSlice";
import { IsEmpty } from "../../helper/formValidation/formValidation";
import { ErrorToast } from "../../helper/notificationAlert/notificationAlert";

const BrandCreateAndUpdate = () => {
  let navigate = useNavigate();
  let brandDetail = useSelector((state) => state.brand.brandDetail);

  let brandNameRef = useRef();
  let [id, setId] = useState("0");

  const handleClick = async () => {
    let brandName = brandNameRef.value;

    if (!IsEmpty(brandName)) {
      ErrorToast("Brand Name is requred");
    } else {
      if (id !== null && id !== "0") {
        let result = await updateBrand(id, brandName);
        if (result) {
          store.dispatch(resetBrandDetail());
          navigate("/brand-list");
        }
      } else {
        let result = await createBrand(brandName);
        if (result) {
          navigate("/brand-list");
        }
      }
    }
  };

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    setId(params.get("id"));
    if (id !== null && id !== "0") {
      (async () => {
        await getBrandDetailById(id);
      })();
    }
    // update input value reset when user go to update componet but not update
    return () => {
      store.dispatch(store.dispatch(resetBrandDetail()));
    };
  }, [id]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <h5>
                  {id !== null && id !== "0" ? "Update Brand" : "Create Brand"}
                </h5>
                <hr className="bg-light" />
                <div className="col-4 p-2">
                  <label className="form-label">Brand Name</label>
                  <input
                    ref={(input) => (brandNameRef = input)}
                    className="form-control form-control-sm"
                    type="text"
                    key={Math.random()}
                    defaultValue={
                      brandDetail.length > 0 ? brandDetail[0].name : ""
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 p-2">
                  <button
                    className="btn btn-sm my-3 btn-success"
                    onClick={handleClick}
                  >
                    {id !== null && id !== "0"
                      ? "Update Brand"
                      : "Create Brand"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCreateAndUpdate;
