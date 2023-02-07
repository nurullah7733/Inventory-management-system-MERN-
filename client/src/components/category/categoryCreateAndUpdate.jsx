import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createCategory,
  getCategoryDetailById,
  updateCategory,
} from "../../APIRequest/categoryApi";
import store from "../../app/store";
import { resetCategoryDetail } from "../../features/category/categorySlice";
import { IsEmpty } from "../../helper/formValidation/formValidation";
import { ErrorToast } from "../../helper/notificationAlert/notificationAlert";

const CategoryCreateAndUpdate = () => {
  let navigate = useNavigate();
  let categoryDetail = useSelector((state) => state.category.categoryDetail);

  let categoryNameRef = useRef();
  let [id, setId] = useState("0");

  const handleClick = async () => {
    let categoryName = categoryNameRef.value;

    if (!IsEmpty(categoryName)) {
      ErrorToast("Category Name is requred");
    } else {
      if (id !== null && id !== "0") {
        let result = await updateCategory(id, categoryName);
        if (result) {
          store.dispatch(resetCategoryDetail());
          navigate("/category-list");
        }
      } else {
        let result = await createCategory(categoryName);
        if (result) {
          navigate("/category-list");
        }
      }
    }
  };

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    setId(params.get("id"));
    if (id !== null && id !== "0") {
      (async () => {
        await getCategoryDetailById(id);
      })();
    }
    // update input value reset when user go to update componet but not update
    return () => {
      store.dispatch(store.dispatch(resetCategoryDetail()));
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
                    ? "Update Category"
                    : "Create Category"}
                </h5>
                <hr className="bg-light" />
                <div className="col-4 p-2">
                  <label className="form-label">Category Name</label>
                  <input
                    ref={(input) => (categoryNameRef = input)}
                    className="form-control form-control-sm"
                    type="text"
                    key={Math.random()}
                    defaultValue={
                      categoryDetail.length > 0 ? categoryDetail[0].name : ""
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
                      ? "Update Category"
                      : "Create Category"}
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

export default CategoryCreateAndUpdate;
