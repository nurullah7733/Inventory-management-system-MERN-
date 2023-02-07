import axios from "axios";
import store from "../app/store";
import { hideLoader, showLoader } from "../features/settings/settingsSlice";
import { getToken } from "../helper/sessionHelper/sessionHelper";
import {
  ErrorToast,
  SuccessToast,
} from "../helper/notificationAlert/notificationAlert";

import {
  setExpenseTotal,
  setLast30DaysExpense,
  setLast30DaysPurchase,
  setLast30DaysReturn,
  setLast30DaysSale,
  setPurchaseTotal,
  setReturnTotal,
  setSaleTotal,
} from "../features/summary/summarySlice";

let baseUrl = "http://localhost:8080";
const AxiosHeader = { headers: { token: getToken() } };

export const expenseSummaryRequest = async () => {
  let url = `${baseUrl}/expense-summary/`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data.length > 0) {
        store.dispatch(setExpenseTotal(res.data.data[0].total[0].totalAmount));
        store.dispatch(setLast30DaysExpense(res.data.data[0].last30Days));
        return true;
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

export const saleSummaryRequest = async () => {
  let url = `${baseUrl}/sales-summary/`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data.length > 0) {
        store.dispatch(setSaleTotal(res.data.data[0].total[0].totalAmount));
        store.dispatch(setLast30DaysSale(res.data.data[0].last30Days));
        return true;
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

export const purchaseSummaryRequest = async () => {
  let url = `${baseUrl}/purchase-summary/`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data.length > 0) {
        store.dispatch(setPurchaseTotal(res.data.data[0].total[0].totalAmount));
        store.dispatch(setLast30DaysPurchase(res.data.data[0].last30Days));
        return true;
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

export const returnSummaryRequest = async () => {
  let url = `${baseUrl}/return-summary/`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data.length > 0) {
        store.dispatch(setReturnTotal(res.data.data[0].total[0].totalAmount));
        store.dispatch(setLast30DaysReturn(res.data.data[0].last30Days));
        return true;
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
