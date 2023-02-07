import axios from "axios";
import store from "../app/store";
import { hideLoader, showLoader } from "../features/settings/settingsSlice";
import {
  setList,
  setSupplierDetail,
  setTotal,
} from "../features/supplier/supplierSlice";
import {
  ErrorToast,
  SuccessToast,
} from "../helper/notificationAlert/notificationAlert";
import { getToken } from "../helper/sessionHelper/sessionHelper";

let baseUrl = "http://localhost:8080";
let AxiosHeader = { headers: { token: getToken() } };
export const createSupplierApi = async (
  supplierName,
  mobile,
  email,
  address
) => {
  let url = `${baseUrl}/create-supplier`;
  let postBody = { name: supplierName, phone: mobile, email, address };
  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, postBody, AxiosHeader);
    store.dispatch(hideLoader());
    console.log(res.data.status);
    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Supplier Create Success");
      return true;
    } else if (res.status === 200 && res.data.data.keyPattern.phone === 1) {
      ErrorToast("Phone Number already Exits");
      return false;
    } else {
      ErrorToast("Request fail, try again");
      return false;
    }
  } catch (error) {
    ErrorToast("Something went wrong");
    store.dispatch(hideLoader());
    return false;
  }
};

export const SupplierListApi = async (pageNo, perPage, searchKeyword) => {
  let url = `${baseUrl}/list-suppliers/${pageNo}/${perPage}/${searchKeyword}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());
    if (res.status === 200 && res.data.status === "success") {
      store.dispatch(setTotal(res.data.data[0].total[0].count));
      store.dispatch(setList(res.data.data[0].rows));
      return true;
    } else if (res.status === 200 && res.data.data[0].total.length === 0) {
      store.dispatch(setTotal(res.data.data[0].total));
      store.dispatch(setList(res.data.data[0].rows));
      return false;
    } else {
      ErrorToast("Request fail, try again");
      return false;
    }
  } catch (error) {
    ErrorToast("Something went wrong");
    store.dispatch(hideLoader());
    return false;
  }
};

export const deleteSupplier = async (id) => {
  let url = `${baseUrl}/delete-supplier/${id}`;
  store.dispatch(showLoader());
  let res = await axios.get(url, AxiosHeader);
  store.dispatch(hideLoader());
  try {
    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Supplier delete Success");
      return true;
    } else if (res.status === 200 && res.data.status === "associate") {
      ErrorToast(res.data.data);
      return false;
    } else {
      ErrorToast("Request fail. please try again");
      return false;
    }
  } catch (e) {
    ErrorToast("Request fail. please try again");
    store.dispatch(hideLoader());

    return false;
  }
};

export const getSupplierById = async (id) => {
  let url = `${baseUrl}/get-supplier/${id}`;
  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());
    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data.length > 0) {
        store.dispatch(setSupplierDetail(res.data.data));
      } else {
        ErrorToast("Data not found");
        return false;
      }
    } else {
      ErrorToast("Request fail. please try again");
      return false;
    }
  } catch (e) {
    ErrorToast("Request fail. please try again");
    store.dispatch(hideLoader());
    return false;
  }
};

export const updateSupplier = async (
  id,
  supplierName,
  mobile,
  email,
  address
) => {
  let url = `${baseUrl}/update-supplier/${id}`;
  let postBody = { name: supplierName, phone: mobile, email, address };
  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, postBody, AxiosHeader);
    store.dispatch(hideLoader());
    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Supplier update success");
      return true;
    } else {
      ErrorToast("Fail, please try again");
      return false;
    }
  } catch (e) {
    ErrorToast("Something went wrong, please try again");
    store.dispatch(hideLoader());
    return false;
  }
};
