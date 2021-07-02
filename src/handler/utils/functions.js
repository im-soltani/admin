import { PROJECT_NAME, routeToTitle } from "./constants";

export const setDocumentTitle = subTitle => {
  document.title = `${PROJECT_NAME} | ${subTitle}`;
};

export const pathToTitle = pathname => {
  const path = pathname.split("/")[1] || pathname.replace("/", "");
  return routeToTitle[path] || "";
};

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

export const getRequest = (body = null, method = "POST") => {
  const request = {
    headers,
    method
  };
  const token = localStorage.getItem("token-admin");
  if (token) request.headers.Authorization = token;
  if (body && method === "POST") request.body = JSON.stringify(body);
  return request;
};
