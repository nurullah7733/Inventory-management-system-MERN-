import axios from "axios";
import store from "../app/store";
import { hideLoader, showLoader } from "../features/settings/settingsSlice";
import { getToken } from "../helper/sessionHelper/sessionHelper";
import {
  ErrorToast,
  SuccessToast,
} from "../helper/notificationAlert/notificationAlert";
import {
  setBrandDropdownList,
  setCategoryDropdownList,
  setFormValue,
  setProductList,
  setProductListTotal,
} from "../features/product/productSlice";

let baseUrl = "http://localhost:8080";
const AxiosHeader = { headers: { token: getToken() } };

export const categoryDropdownListRequest = async () => {
  let url = `${baseUrl}/all-category`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      store.dispatch(setCategoryDropdownList(res.data.data));
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
export const brandDropdownListRequest = async () => {
  let url = `${baseUrl}/all-brand`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      store.dispatch(setBrandDropdownList(res.data.data));
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

export const createProductRequest = async (
  brandId,
  categoryId,
  name,
  unit,
  details
) => {
  let url = `${baseUrl}/create-product`;
  let postBody = { brandId, categoryId, name, unit, details };

  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, postBody, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Product Create success");
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
export const listBrandRequest = async (pageNo, perPage, searchKeyword) => {
  let url = `${baseUrl}/list-product/${pageNo}/${perPage}/${searchKeyword}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data[0].total.length > 0) {
        store.dispatch(setProductListTotal(res.data.data[0].total[0].count));
        store.dispatch(setProductList(res.data.data[0].rows));
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

export const getProductDetailById = async (id) => {
  let url = `${baseUrl}/product-detail/${id}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      if (res.data.data.length > 0) {
        let formValue = res.data.data[0];
        store.dispatch(
          setFormValue({ Name: "categoryId", Value: formValue.categoryId })
        );
        store.dispatch(
          setFormValue({ Name: "brandId", Value: formValue.brandId })
        );
        store.dispatch(setFormValue({ Name: "name", Value: formValue.name }));
        store.dispatch(setFormValue({ Name: "unit", Value: formValue.unit }));
        store.dispatch(
          setFormValue({ Name: "details", Value: formValue.details })
        );
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
export const updateProduct = async (
  id,
  brandId,
  categoryId,
  name,
  unit,
  details
) => {
  let url = `${baseUrl}/update-product/${id}`;
  let postBody = {
    brandId: brandId,
    categoryId: categoryId,
    name: name,
    unit: unit,
    details: details,
  };
  try {
    store.dispatch(showLoader());
    let res = await axios.post(url, postBody, AxiosHeader);

    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Product Update success");
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

export const deleteProduct = async (id) => {
  let url = `${baseUrl}/delete-product/${id}`;

  try {
    store.dispatch(showLoader());
    let res = await axios.get(url, AxiosHeader);
    store.dispatch(hideLoader());

    if (res.status === 200 && res.data.status === "success") {
      SuccessToast("Product Delete success");
      return true;
    } else if (res.status === 200 && res.data.status === "associate") {
      ErrorToast(res.data.data);
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
