import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createExpenseType,
  getExpenseTypeDetailById,
  updateExpenseType,
} from "../../APIRequest/expenseTypeApi";
import store from "../../app/store";
import { resetExpenseTypeDetailById } from "../../features/expenseType/expenseTypeSlice";

const ExpenseType = () => {
  let navigate = useNavigate();
  let expenseTypeRef = useRef();
  let [id, setId] = useState("0");
  let expenseDetail = useSelector(
    (state) => state.expenseType.expenseTypeDetail[0]
  );

  const handleClick = async () => {
    let expenseType = expenseTypeRef.value;
    if (id !== null && id !== "0") {
      (async () => {
        let result = await updateExpenseType(id, expenseType);
        if (result) {
          if (result) navigate("/expense-type-list");
        }
      })();
    } else {
      let result = await createExpenseType(expenseType);
      if (result) navigate("/expense-type-list");
    }
  };

  // for Update data
  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    setId(params.get("id"));
    if (id !== null && id !== "0") {
      (async () => {
        await getExpenseTypeDetailById(id);
      })();
    } else {
      store.dispatch(resetExpenseTypeDetailById());
    }
  }, [id]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <h5>
                  {expenseDetail !== undefined && expenseDetail.name.length > 0
                    ? "Update Expense Type"
                    : "Create Expense Type"}
                </h5>
                <hr className="bg-light" />

                <div className="col-4 p-2">
                  <label className="form-label">Expense Type Name</label>
                  <input
                    ref={(input) => (expenseTypeRef = input)}
                    className="form-control form-control-sm"
                    type="text"
                    key={Math.random()}
                    defaultValue={
                      expenseDetail !== undefined &&
                      expenseDetail.name.length > 0 > 0
                        ? expenseDetail.name
                        : ""
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
                    {expenseDetail !== undefined &&
                    expenseDetail.name.length > 0
                      ? "Update"
                      : "Create"}
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

export default ExpenseType;
