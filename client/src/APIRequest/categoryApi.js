import axios from "axios";
import store from "../app/store";
import { hideLoader, showLoader } from "../features/settings/settingsSlice";
import { getToken } from "../helper/sessionHelper/sessionHelper";
import {
  ErrorToast,
  SuccessToast,
} from "../helper/notificationAlert/notificationAlert";
import {
  setCategoryDetail,
  setCategoryList,
  setCategoryTotal,
} from "../features/category/categorySlice";

let baseUrl = "http://localhost:8080";
const AxiosHeader = { headers: { token: getToken() } };

export const createCategory = async (name) => {
  let url = `${baseUrl}/create-category`;
  let postBody = { name };

  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Category Create success");
      return true;
    } else if (res.status === 200 && res.data.status === "fail") {
      if (res.data.data.keyPattern.name === 1) {
        ErrorToast(`"${name}" already Exits`);
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
export const listCategory = async (pageNo, perPage, searchKeyword) => {
  let url = `${baseUrl}/list-categories/${pageNo}/${perPage}/${searchKeyword}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data[0].total.length > 0) {
        store.dispatch(setCategoryTotal(res.data.data[0].total[0].count));
        store.dispatch(setCategoryList(res.data.data[0].rows));
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

export const getCategoryDetailById = async (id) => {
  let url = `${baseUrl}/category-detail/${id}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data.length > 0) {
        store.dispatch(setCategoryDetail(res.data.data));
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
export const updateCategory = async (id, categoryName) => {
  let url = `${baseUrl}/update-category/${id}`;
  let postBody = { name: categoryName };
  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Category Update success");
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

export const deleteCategory = async (id) => {
  let url = `${baseUrl}/delete-category/${id}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Brand Delete success");
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
