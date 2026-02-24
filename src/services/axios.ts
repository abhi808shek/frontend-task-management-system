import axios, { type InternalAxiosRequestConfig } from "axios";
import { tokenService } from "../utility";

const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

/* ===================== REQUEST ===================== */
AXIOS.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenService.getAccess();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ===================== REFRESH LOGIC ===================== */
let isRefreshing = false;

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else if (token) p.resolve(token);
  });
  failedQueue = [];
};

const refreshToken = async () => {
  const refresh = tokenService.getRefresh();
  if (!refresh) throw new Error("No refresh token");

  const res = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
    { refresh_token: refresh }
  );

  return res.data as {
    access_token: string;
    refresh_token: string;
  };
};

/* ===================== RESPONSE ===================== */
AXIOS.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(AXIOS(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const data = await refreshToken();
        tokenService.setTokens(data.access_token, data.refresh_token);

        AXIOS.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;

        processQueue(null, data.access_token);

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return AXIOS(originalRequest);
      } catch (err) {
        processQueue(err, null);
        tokenService.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default AXIOS;