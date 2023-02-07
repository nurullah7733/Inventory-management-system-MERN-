import cogoToast from "cogo-toast";

class ToastNotification {
  SuccessToast(message) {
    return cogoToast.success(message);
  }
  ErrorToast(message) {
    return cogoToast.error(message);
  }
}

export const { ErrorToast, SuccessToast } = new ToastNotification();
