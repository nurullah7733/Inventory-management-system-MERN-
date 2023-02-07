let EmailRegx = /\S+@\S+\.\S+/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
class FormHelper {
  IsEmpty(value) {
    return value.length > 0;
  }

  IsEmail(value) {
    return EmailRegx.test(value);
  }
  IsMobileNumber(value) {
    return MobileRegx.test(value);
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}

export const { getBase64, IsEmail, IsEmpty, IsMobileNumber } = new FormHelper();
