import axios from "axios";
import store from "../app/store";
import { hideLoader, showLoader } from "../features/settings/settingsSlice";
import { getToken } from "../helper/sessionHelper/sessionHelper";
import {
  ErrorToast,
  SuccessToast,
} from "../helper/notificationAlert/notificationAlert";

import {
  setCustomerDropdownList,
  setProductDropdownList,
  setReturnList,
  setReturnListTotal,
} from "../features/return/returnSlice";

let baseUrl = "http://localhost:8080";
const AxiosHeader = { headers: { token: getToken() } };

export const customerDropdownListRequest = async () => {
  let url = `${baseUrl}/all-customer/`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data.length > 0) {
        store.dispatch(setCustomerDropdownList(res.data.data));
      }
      return true;
    } else if (res.status === 200 && res.data.status === "fail") {
      return false;
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
export const productDropdownListRequest = async () => {
  let url = `${baseUrl}/all-product`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data.length > 0) {
        store.dispatch(setProductDropdownList(res.data.data));
      }
      return true;
    } else if (res.status === 200 && res.data.status === "fail") {
      return false;
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
export const createReturnRequest = async (parent, childs) => {
  let url = `${baseUrl}/create-return`;
  let postBody = { parent, childs };

  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Product Return Success ");
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

export const listReturnRequest = async (pageNo, perPage, searchKeyword) => {
  let url = `${baseUrl}/return-list/${pageNo}/${perPage}/${searchKeyword}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data[0].total.length > 0) {
        store.dispatch(setReturnListTotal(res.data.data[0].total[0].count));
        store.dispatch(setReturnList(res.data.data[0].rows));
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

export const deleteReturnRequest = async (id) => {
  let url = `${baseUrl}/return-delete/${id}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Return delete Success ");
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
