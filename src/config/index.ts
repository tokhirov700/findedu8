import axios from "axios";
import { getCookies, setCookies, removeCookies } from "@/utils/cocies";

const http = axios.create({
  baseURL: "https://findcourse.net.uz/api",
});

const refreshAccessToken = async () => {
  const refreshToken = getCookies("refresh_token");

  if (!refreshToken) throw new Error("Refresh token topilmadi");

  try {
    const response = await axios.post("https://findcourse.net.uz/api/users/refreshToken", {
      refreshToken: refreshToken,
    });

    const { access_token, refresh_token: newRefreshToken } = response.data;

    setCookies("access_token", access_token);
    setCookies("refresh_token", newRefreshToken);

    return access_token;
  } catch (error) {
    console.error("Refresh token orqali token yangilash muvaffaqiyatsiz:", error);
    removeCookies("access_token");
    removeCookies("refresh_token");
    throw error;
  }
};


http.interceptors.request.use((config) => {
  const token = getCookies("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});



http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return http(originalRequest); 
      } catch (refreshError) {
        console.error("Foydalanuvchini chiqarib yuborish kerak " + refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default http;
