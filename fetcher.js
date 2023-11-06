import Axios from "axios";
import { client_id, client_secret, grant_type_refresh } from "@/consts";
import useSWROrig from "swr";
import useSWRMutationOrig from "swr/mutation";

import { BASE_URL } from "./consts";

export const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const deleteAxios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginAxios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

axios.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 401) {
        originalConfig._retry = true;

        try {
          const rs = await refreshToken();
          const { access } = rs;
          console.log("rsssss", rs);
          localStorage.setItem("at", rs.access_token);
          localStorage.setItem("rt", rs.refresh_token);
          localStorage.setItem("expire", rs.expires_in);
          // window.localStorage.setItem("at", access);

          return axios(originalConfig);
        } catch (error) {
          return Promise.reject(error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

const getLocalAccessToken = () => localStorage.getItem("at");

const getLocalRefreshToken = () => localStorage.getItem("rt");

function refreshToken() {
  return axios
    .post(
      "/o/token/",
      // {
      //   refresh: getLocalRefreshToken(),
      // },

      {
        // username: username,
        // password: password,
        client_id: client_id,
        client_secret: client_secret,
        grant_type: grant_type_refresh,
        refresh_token: getLocalRefreshToken(),
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((r) => r.data);
}

// export const useSWR = useSWROrig;
// export const useSWRMutation = useSWRMutationOrig;

export const useSWR = (endPoint, options) =>
  useSWROrig(
    endPoint ? [endPoint, options] : null,
    async ([url, options]) =>
      await axios(
        url,
        options
          ? {
              method: options.method || "GET",
              data: options.body,
            }
          : {}
      ).then((res) => res.data)
  );
export const useSWRMutation = (endPoint, method = "POST") =>
  useSWRMutationOrig(
    endPoint,
    async (url, { arg }) =>
      await axios(url, { method, data: arg }).then((r) => r.data)
  );

export const useLoginSWRMutation = (endPoint, method = "POST") =>
  useSWRMutationOrig(
    endPoint,
    async (url, { arg }) =>
      await axios(url, { method, data: arg }).then((r) => r.data)
  );

export const useDeleteSWRMutation = (endPoint, method = "DELETE") =>
  useSWRMutationOrig(
    endPoint,
    async (url, { arg }) =>
      await axios(url, { method, data: arg }).then((r) => r)
  );
