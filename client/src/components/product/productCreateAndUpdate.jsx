import React, { useRef, useEffect, useState } from "react";
import { IsEmpty } from "../../helper/formValidation/formValidation";
import { useSelector } from "react-redux";

import { ErrorToast } from "../../helper/notificationAlert/notificationAlert";
import { useNavigate } from "react-router-dom";
import store from "../../app/store";
import {
  brandDropdownListRequest,
  categoryDropdownListRequest,
  createProductRequest,
  getProductDetailById,
  updateProduct,
} from "../../APIRequest/productApi";
import {
  resetFormValue,
  setFormValue,
} from "../../features/product/productSlice";

const Product = () => {
  let navigate = useNavigate();
  let [id, setId] = useState("0");
  let categoryDropdownList = useSelector(
    (state) => state.product.categoryDropdownList
  );
  let brandDropdownList = useSelector(
    (state) => state.product.brandDropdownList
  );
  let { brandId, categoryId, name, unit, details } = useSelector(
    (state) => state.product.formValue
  );

  const handleClick = async () => {
    if (!IsEmpty(categoryId)) {
      ErrorToast("Please Select Category");
    } else if (!IsEmpty(brandId)) {
      ErrorToast("Please Select Brand");
    } else if (!IsEmpty(name)) {
      ErrorToast("Product Name is Required");
    } else if (!IsEmpty(unit)) {
      ErrorToast("Unit is Required");
    } else {
      if (id !== null && id !== "0") {
        (async () => {
          let result = await updateProduct(
            id,
            brandId,
            categoryId,
            name,
            unit,
            details
          );
          if (result) {
            store.dispatch(resetFormValue());
            navigate("/product-list");
          }
        })();
      } else {
        let result = await createProductRequest(
          brandId,
          categoryId,
          name,
          unit,
          details
        );
        if (result) {
          store.dispatch(resetFormValue());
          navigate("/product-list");
        }
      }
    }
  };

  useEffect(() => {
    brandDropdownListRequest();
    categoryDropdownListRequest();

    let params = new URLSearchParams(window.location.search);
    setId(params.get("id"));
    if (id !== null && id !== "0") {
      (async () => {
        await getProductDetailById(id);
      })();
    }
    // update input value reset when user go to update componet but not update
    return () => {
      store.dispatch(resetFormValue());
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
                  {id !== null && id !== "0"
                    ? "Update Product"
                    : "Create Product"}
                </h5>
                <hr className="bg-light" />
                <div className="col-4 p-2">
                  <label className="form-label">Category</label>
                  <select
                    onChange={(e) =>
                      store.dispatch(
                        setFormValue({
                          Name: "categoryId",
                          Value: e.target.value,
                        })
                      )
                    }
                    value={categoryId}
                    className="form-select form-select-sm"
                  >
                    <option value="">Select Category</option>
                    {categoryDropdownList.map((item, i) => {
                      return (
                        <option key={i.toLocaleString()} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-4 p-2">
                  <label className="form-label">Brand</label>
                  <select
                    onChange={(e) =>
                      store.dispatch(
                        setFormValue({
                          Name: "brandId",
                          Value: e.target.value,
                        })
                      )
                    }
                    value={brandId}
                    className="form-select form-select-sm"
                  >
                    <option value="">Select Brand</option>
                    {brandDropdownList.map((item, i) => {
                      return (
                        <option key={i.toLocaleString()} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-4 p-2">
                  <label className="form-label">Product Name</label>
                  <input
                    onChange={(e) =>
                      store.dispatch(
                        setFormValue({
                          Name: "name",
                          Value: e.target.value,
                        })
                      )
                    }
                    value={name}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>
                <div className="col-3 p-2">
                  <label className="form-label">Unit</label>
                  <input
                    onChange={(e) =>
                      store.dispatch(
                        setFormValue({
                          Name: "unit",
                          Value: e.target.value,
                        })
                      )
                    }
                    value={unit}
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="PCS"
                  />
                </div>
                <div className="col-9 p-2">
                  <label className="form-label">Details</label>
                  <input
                    onChange={(e) =>
                      store.dispatch(
                        setFormValue({
                          Name: "details",
                          Value: e.target.value,
                        })
                      )
                    }
                    value={details}
                    className="form-control form-control-sm"
                    type="textarea"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 p-2">
                  <button
                    onClick={handleClick}
                    className="btn btn-sm my-3 btn-success"
                  >
                    {id !== null && id !== "0"
                      ? "Update Expense"
                      : "Create Expense"}
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

export default Product;
