class SessionHelper {
  setUserData(value) {
    localStorage.setItem("userData", JSON.stringify(value));
  }
  getUserData() {
    return JSON.parse(localStorage.getItem("userData"));
  }
  setToken(value) {
    localStorage.setItem("token", JSON.stringify(value));
  }
  getToken() {
    return JSON.parse(localStorage.getItem("token"));
  }
  setEmail(value) {
    localStorage.setItem("email", value);
  }
  getEmail() {
    return localStorage.getItem("email");
  }
  setOtp(value) {
    localStorage.setItem("otp", value);
  }
  getOtp() {
    return localStorage.getItem("otp");
  }
  sessionDestroy() {
    localStorage.clear();
    window.location.href = "/login";
  }
}

export const {
  getUserData,
  setUserData,
  getToken,
  setToken,
  getEmail,
  setEmail,
  getOtp,
  setOtp,
  sessionDestroy,
} = new SessionHelper();
