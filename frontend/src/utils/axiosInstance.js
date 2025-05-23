import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api/user",
  withCredentials: true, // Required to send HTTP-only cookies
});

// Request interceptor to add access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axios.post(
          "http://localhost:3000/api/user/refresh-token",
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshRes.data.access_token;

        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (err) {
        console.error("Refresh failed. Logging out.");
        //add redirection to logout
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
