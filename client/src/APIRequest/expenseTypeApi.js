import axios from "axios";
import store from "../app/store";
import { hideLoader, showLoader } from "../features/settings/settingsSlice";
import { getToken } from "../helper/sessionHelper/sessionHelper";
import {
  ErrorToast,
  SuccessToast,
} from "../helper/notificationAlert/notificationAlert";
import {
  setExpenseTypeDetailById,
  setExpenseTypeList,
  setExpenseTypeTotal,
} from "../features/expenseType/expenseTypeSlice";

let baseUrl = "http://localhost:8080";
const AxiosHeader = { headers: { token: getToken() } };

export const createExpenseType = async (name) => {
  let url = `${baseUrl}/create-expense-type`;
  let postBody = { name };

  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Expense type Create success");

      return true;
    } else if (
      res.status === 200 &&
      res.data.status === "fail" &&
      res.data.data.keyPattern.name === 1
    ) {
      ErrorToast(`"${name}" already exits`);
      return false;
    } else {
      ErrorToast("Request fail, Please try again");
      return false;
    }
  } catch (error) {
    ErrorToast("Something went wrong. Please try again");
    store.dispatch(hideLoader());
    return false;
  }
};

export const listExpenseType = async (pageNo, perPage, searchKeyword) => {
  let url = `${baseUrl}/list-expense-type/${pageNo}/${perPage}/${searchKeyword}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data[0].total.length > 0) {
        store.dispatch(setExpenseTypeTotal(res.data.data[0].total[0].count));
        store.dispatch(setExpenseTypeList(res.data.data[0].rows));
      } else {
        store.dispatch(setExpenseTypeTotal(res.data.data[0].total));
        store.dispatch(setExpenseTypeList(res.data.data[0].rows));
      }
    } else {
      ErrorToast("Request fail, Please try again");
      return false;
    }
  } catch (error) {
    ErrorToast("Something went wrong. Please try again");
    store.dispatch(hideLoader());
    return false;
  }
};
export const deleteExpenseType = async (id) => {
  let url = `${baseUrl}/delete-expense-type/${id}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "associate") {
      ErrorToast(res.data.data);
      return false;
    } else if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Expense Type delete success");
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

export const getExpenseTypeDetailById = async (id) => {
  let url = `${baseUrl}/expense-type-detail/${id}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      store.dispatch(setExpenseTypeDetailById(res.data.data));
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

export const updateExpenseType = async (id, name) => {
  let url = `${baseUrl}/update-expense-type/${id}`;
  let postBody = { name };
  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Expense Type Update success");
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
