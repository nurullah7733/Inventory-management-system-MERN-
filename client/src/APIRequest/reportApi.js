import axios from "axios";
import store from "../app/store";
import { hideLoader, showLoader } from "../features/settings/settingsSlice";
import { getToken } from "../helper/sessionHelper/sessionHelper";
import { ErrorToast } from "../helper/notificationAlert/notificationAlert";
import {
  setExpenseReport,
  setPurchaseReport,
  setReturnReport,
  setSaleReport,
} from "../features/report/reportSlice";

let baseUrl = "http://localhost:8080";
const AxiosHeader = { headers: { token: getToken() } };

export const expenseReportRequest = async (fromDate, toDate) => {
  let url = `${baseUrl}/expense-report`;
  let postBody = {
    fromDate: fromDate + "T00:00:00.000+00:00",
    toDate: toDate + "T00:00:00.000+00:00",
  };

  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data[0].total.length > 0) {
        store.dispatch(setExpenseReport(res.data.data[0]));
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

export const purchaseReportRequest = async (fromDate, toDate) => {
  let url = `${baseUrl}/purchase-report`;
  let postBody = {
    fromDate: fromDate + "T00:00:00.000+00:00",
    toDate: toDate + "T00:00:00.000+00:00",
  };

  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data[0].total.length > 0) {
        store.dispatch(setPurchaseReport(res.data.data[0]));
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

export const saleReportRequest = async (fromDate, toDate) => {
  let url = `${baseUrl}/sales-report`;
  let postBody = {
    fromDate: fromDate + "T00:00:00.000+00:00",
    toDate: toDate + "T00:00:00.000+00:00",
  };

  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data[0].total.length > 0) {
        store.dispatch(setSaleReport(res.data.data[0]));
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

export const returnReportRequest = async (fromDate, toDate) => {
  let url = `${baseUrl}/return-report`;
  let postBody = {
    fromDate: fromDate + "T00:00:00.000+00:00",
    toDate: toDate + "T00:00:00.000+00:00",
  };

  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data[0].total.length > 0) {
        store.dispatch(setReturnReport(res.data.data[0]));
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
