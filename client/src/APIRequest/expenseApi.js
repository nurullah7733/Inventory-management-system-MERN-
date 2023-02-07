import axios from "axios";
import store from "../app/store";
import { hideLoader, showLoader } from "../features/settings/settingsSlice";
import { getToken } from "../helper/sessionHelper/sessionHelper";
import {
  ErrorToast,
  SuccessToast,
} from "../helper/notificationAlert/notificationAlert";
import {
  OnChangeExpenseInput,
  setExpenseDetail,
  setExpenseDetailTypeId,
  setExpenseList,
  setExpenseListTotal,
  setExpenseTypeDropdownList,
  setOnChangeExpenseInput,
} from "../features/expense/expenseSlice";

let baseUrl = "http://localhost:8080";
const AxiosHeader = { headers: { token: getToken() } };

export const dropdownExpenseType = async () => {
  let url = `${baseUrl}/all-expense-type`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      store.dispatch(setExpenseTypeDropdownList(res.data.data));
      return true;
    } else {
      ErrorToast("Request fail. Please try again");
      return false;
    }
  } catch (error) {
    ErrorToast("Something went wrong. Please try again");
    store.dispatch(hideLoader());
    return false;
  }
};
export const createExpense = async (typeId, amount, note) => {
  let url = `${baseUrl}/create-expense`;
  let postBody = { typeId, amount, note };
  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Expense Create success");
      return true;
    } else {
      ErrorToast("Request fail. Please try again");
      return false;
    }
  } catch (error) {
    ErrorToast("Something went wrong. Please try again");
    store.dispatch(hideLoader());
    return false;
  }
};
export const listExpense = async (pageNo, perPage, searchKeyword) => {
  let url = `${baseUrl}/list-expense/${pageNo}/${perPage}/${searchKeyword}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data[0].total.length > 0) {
        store.dispatch(setExpenseListTotal(res.data.data[0].total[0].count));
        store.dispatch(setExpenseList(res.data.data[0].rows));
        return true;
      } else {
        ErrorToast("Data not found");
        return false;
      }
    } else {
      ErrorToast("Request fail. Please try again");
      return false;
    }
  } catch (error) {
    ErrorToast("Something went wrong. Please try again");
    store.dispatch(hideLoader());
    return false;
  }
};

export const getExpenseDetailById = async (id) => {
  let url = `${baseUrl}/expense-detail/${id}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data.length > 0) {
        let formValue = res.data.data[0];
        store.dispatch(
          setOnChangeExpenseInput({ Name: "typeId", Value: formValue.typeId })
        );
        store.dispatch(
          setOnChangeExpenseInput({ Name: "amount", Value: formValue.amount })
        );
        store.dispatch(
          setOnChangeExpenseInput({ Name: "note", Value: formValue.note })
        );
      }
      return true;
    } else {
      ErrorToast("Request fail. Please try again");
      return false;
    }
  } catch (error) {
    ErrorToast("Something went wrong. Please try again");
    store.dispatch(hideLoader());
    return false;
  }
};
export const updateExpense = async (id, typeId, amount, note) => {
  let url = `${baseUrl}/update-expense/${id}`;
  let postBody = { typeId, amount, note };
  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Expense Update success");
      return true;
    } else {
      ErrorToast("Request fail. Please try again");
      return false;
    }
  } catch (error) {
    ErrorToast("Something went wrong. Please try again");
    store.dispatch(hideLoader());
    return false;
  }
};
export const deleteExpense = async (id) => {
  let url = `${baseUrl}/delete-expense/${id}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Expense Delete success");
      return true;
    } else {
      ErrorToast("Request fail. Please try again");
      return false;
    }
  } catch (error) {
    ErrorToast("Something went wrong. Please try again");
    store.dispatch(hideLoader());
    return false;
  }
};
