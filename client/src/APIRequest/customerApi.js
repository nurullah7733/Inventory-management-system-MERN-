import axios from "axios";
import store from "../app/store";
import {
  resetCustomerDetail,
  setCustomerDetail,
  setList,
  setTotal,
} from "../features/customer/customerSlice";
import { hideLoader, showLoader } from "../features/settings/settingsSlice";
import {
  ErrorToast,
  SuccessToast,
} from "../helper/notificationAlert/notificationAlert";
import { getToken } from "../helper/sessionHelper/sessionHelper";

let baseUrl = "http://localhost:8080";
const AxiosHeader = { headers: { token: getToken() } };

export const customerCreate = async (customerName, email, phone, address) => {
  let url = `${baseUrl}/create-customer`;
  let postBody = { customerName, email, phone, address };
  try {
    store.dispatch(showLoader());
    let data = await axios.post(url, postBody, AxiosHeader);
    store.dispatch(hideLoader());
    if (data.status === 200) {
      if (data.data.status === "fail") {
        if (data.data.data.keyPattern.phone === 1) {
          ErrorToast("Phone Number already Exits!");
        }
      } else {
        SuccessToast("Customer Create Success!");
        store.dispatch(hideLoader());
        return true;
      }
    } else {
      ErrorToast("Something went wrong!");
      store.dispatch(hideLoader());
      return false;
    }
  } catch (error) {
    ErrorToast("Something went wrong!");
    store.dispatch(hideLoader());
    return false;
  }
};

export const customerList = async (pageNo, perPage, searchKeyword) => {
  let url = `${baseUrl}/list-customers/${pageNo}/${perPage}/${searchKeyword}`;

  try {
    store.dispatch(showLoader());
    let data = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (data.data.status === "success") {
      if (data.data.data[0].total.length > 0) {
        store.dispatch(setTotal(data.data.data[0].total[0].count));
        store.dispatch(setList(data.data.data[0].rows));
      } else {
        store.dispatch(setTotal(data.data.data[0].total));
        store.dispatch(setList(data.data.data[0].rows));
      }
    } else {
      ErrorToast("Something went wrong");
      return false;
    }
  } catch (error) {
    ErrorToast("Something went wrong");
    store.dispatch(hideLoader());
    return false;
  }
};

export const getCustomerDetailById = async (id) => {
  let url = `${baseUrl}/get-customer-details/${id}`;

  try {
    store.dispatch(showLoader());
    let data = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (data.data.status === "success") {
      store.dispatch(setCustomerDetail(data.data.data));
      return true;
    } else {
      ErrorToast("Request fail, please try again");
      return false;
    }
  } catch (error) {
    ErrorToast("Something went wrong");
    store.dispatch(hideLoader());
    return false;
  }
};

export const updateCustomer = async (
  customerName,
  mobile,
  email,
  address,
  id
) => {
  let url = `${baseUrl}/update-customer/${id}`;
  let updateData = { customerName, phone: mobile, email, address };
  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, updateData, AxiosHeader);
    store.dispatch(hideLoader());
    if (
      res.status === 200 &&
      res.data.data.includes(
        "MongoServerError: E11000 duplicate key error collection:"
      )
    ) {
      ErrorToast("Phone Number already Exits");
      return false;
    }
    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data.modifiedCount === 1) {
        SuccessToast("Customer update success");
        store.dispatch(resetCustomerDetail());
        return true;
      } else {
        ErrorToast("Request fail. please try again");
        return false;
      }
    } else {
      ErrorToast("Something went wrong");
      return false;
    }
  } catch (error) {
    ErrorToast("Something went wrong");
    store.dispatch(hideLoader());
    return false;
  }
};

export const deleteCustomer = async (id) => {
  let url = `${baseUrl}/delete-customer/${id}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "associate") {
      ErrorToast(res.data.data);
      return false;
    } else if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Customer Delete Success");
      return true;
    } else {
      ErrorToast("Request fail. please try again");
      return false;
    }
  } catch (error) {
    ErrorToast("Request fail. please try again");
    store.dispatch(hideLoader());
    return false;
  }
};
