import React, { useRef, useEffect, useState } from "react";
import { IsEmpty, IsNumber } from "../../helper/formValidation/formValidation";
import { useSelector } from "react-redux";
import {
  createExpense,
  dropdownExpenseType,
  getExpenseDetailById,
  updateExpense,
} from "../../APIRequest/expenseApi";
import { ErrorToast } from "../../helper/notificationAlert/notificationAlert";
import { useNavigate } from "react-router-dom";
import store from "../../app/store";
import {
  resetOnChangeExpenseInput,
  setOnChangeExpenseInput,
} from "../../features/expense/expenseSlice";

const Expense = () => {
  let navigate = useNavigate();
  let [id, setId] = useState("0");
  let expenseTypeDropdownList = useSelector(
    (state) => state.expense.expenseTypeDropdownList
  );
  let formValue = useSelector((state) => state.expense.formValue);

  const handleClick = async () => {
    let { typeId, amount, note } = formValue;
    if (!IsEmpty(typeId) || typeId === "") {
      ErrorToast("Please Select Expense Type");
    } else if (amount == 0) {
      ErrorToast("Amount is Required");
    } else {
      if (id !== null && id !== "0") {
        (async () => {
          let result = await updateExpense(id, typeId, amount, note);
          if (result) {
            store.dispatch(resetOnChangeExpenseInput());
            navigate("/expense-list");
          }
        })();
      } else {
        let result = await createExpense(typeId, amount, note);
        if (result) {
          navigate("/expense-list");
        }
      }
    }
  };

  useEffect(() => {
    dropdownExpenseType();

    let params = new URLSearchParams(window.location.search);
    setId(params.get("id"));
    if (id !== null && id !== "0") {
      (async () => {
        await getExpenseDetailById(id);
      })();
    }
    // update input value reset when user go to update componet but not update
    return () => {
      store.dispatch(resetOnChangeExpenseInput());
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
                    ? "Update Expense"
                    : "Create Expense"}
                </h5>
                <hr className="bg-light" />
                <div className="col-4 p-2">
                  <label className="form-label">Expense Type</label>
                  <select
                    value={formValue.typeId}
                    onChange={(e) =>
                      store.dispatch(
                        setOnChangeExpenseInput({
                          Name: "typeId",
                          Value: e.target.value,
                        })
                      )
                    }
                    className="form-select form-select-sm"
                  >
                    <option value="">Select Type</option>
                    {expenseTypeDropdownList.map((item, i) => {
                      return (
                        <option key={i.toLocaleString()} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-4 p-2">
                  <label className="form-label">Expense Amount</label>
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    value={formValue.amount}
                    onChange={(e) =>
                      store.dispatch(
                        setOnChangeExpenseInput({
                          Name: "amount",
                          Value: e.target.value,
                        })
                      )
                    }
                  />
                </div>
                <div className="col-4 p-2">
                  <label className="form-label">Expense Note</label>
                  <input
                    value={formValue.note}
                    onChange={(e) =>
                      store.dispatch(
                        setOnChangeExpenseInput({
                          Name: "note",
                          Value: e.target.value,
                        })
                      )
                    }
                    className="form-control form-control-sm"
                    type="text"
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

export default Expense;
