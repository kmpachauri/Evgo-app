import axios from "axios";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || "https://node.evgo.site";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  headers: {
    "Content-Type": "application/json",
  },
});

let authToken = null;
let onAutoLogout = null;
let onLoadingChange = null;
let activeRequests = 0;

export function setLoadingHandler(handler) {
  onLoadingChange = handler;
}

function setLoading(val) {
  if (onLoadingChange) onLoadingChange(val);
}

export function setAuthToken(token) {
  authToken = token;
}

export function setAutoLogoutHandler(handler) {
  onAutoLogout = handler;
}

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  activeRequests++;
  setLoading(true);
  console.log(
    `[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
    config.data || "",
  );
  return config;
});

api.interceptors.response.use(
  (response) => {
    activeRequests = Math.max(0, activeRequests - 1);
    if (activeRequests === 0) setLoading(false);
    console.log(
      `[API] ${response.status} ${response.config.url}`,
      response.data,
    );
    return response;
  },
  (error) => {
    activeRequests = Math.max(0, activeRequests - 1);
    if (activeRequests === 0) setLoading(false);
    const data = error?.response?.data;
    const msg =
      data?.message || data?.error || error?.message || "Network error";
    console.log(
      `[API] ERROR ${error?.response?.status || 0} ${error?.config?.url}`,
      msg,
    );
    if (
      onAutoLogout &&
      (
        error?.response?.status === 401 ||
        (
          error?.response?.status === 403 &&
          String(msg).toLowerCase().includes("account is blocked")
        )
      )
    ) {
      onAutoLogout(msg);
    }
    const err = new Error(msg);
    err.status = error?.response?.status;
    return Promise.reject(err);
  },
);

export async function requestWithFallback(request, fallbackData) {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    const apiError = error?.response?.data || error;
    if (fallbackData !== undefined) {
      console.warn(
        "API placeholder fallback:",
        apiError?.message || error?.message,
      );
      return fallbackData;
    }
    throw apiError;
  }
}
