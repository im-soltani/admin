import { getRequest } from "../utils/functions";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
const axis = axios.create({
  baseURL: BASE_URL
});
export const signin = params => {
  const request = getRequest(params);
  return fetch(`${BASE_URL}/auth/login/admin`, request).then(res => res.json());
};

export const checkEmail = params => {
  const request = getRequest(params);
  return fetch(`${BASE_URL}/auth/check/email`, request).then(res => res.json());
};

export const checkToken = token => {
  axis.defaults.headers.authorization = token;
  return axis.post("/auth/token/check").catch(async error => {
    if (error.request.status == 401) {
      return false;
    } else {
      return true;
    }
  });
};
