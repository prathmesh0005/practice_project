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

    // If access token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axios.post(
          "http://localhost:3000/api/user/refresh-token",
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshRes.data.access_token;
        // axios.defaults.headers.common[
        //   "Authorization"
        // ] = `Bearer ${newAccessToken}`;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        

        console.log(originalRequest.data);
        return axios(originalRequest);
      } catch (err) {
        // Redirect to login or handle logout
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
