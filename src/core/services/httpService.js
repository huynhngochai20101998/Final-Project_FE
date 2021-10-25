import axios from "axios";
import queryString from "query-string";
import { getToken } from "core/localStore";

const http = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  paramsSerializer: (params) => queryString.stringify(params)
});

http.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers["Authorization"] = `${getToken()}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    console.log("error: ", error);
    error.message = "Something wrong, please try again";
    throw error;
  }
);

export default http;
