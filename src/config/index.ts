import axios from "axios";
import { getCookies, setCookies, removeCookies } from "@/utils/cocies";

const http = axios.create({
  baseURL: "https://findcourse.net.uz/api",
});

// 🔁 Token yangilash funksiyasi
const refreshAccessToken = async () => {
  const refreshToken = getCookies("refresh_token");

  if (!refreshToken) throw new Error("Refresh token topilmadi");

  try {
    const response = await axios.post("https://findcourse.net.uz/api/users/refreshToken", {
      refreshToken: refreshToken,
    });

    const { access_token, refresh_token: newRefreshToken } = response.data;

    // Cookie'ga yangi tokenlarni saqlash
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

// 🛫 Har bir so‘rovga token qo‘shish
http.interceptors.request.use((config) => {
  const token = getCookies("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


// 🧯 Agar access token eskirgan bo‘lsa, refresh qilinadi
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token eskirgan bo‘lsa va bu birinchi urinish bo‘lsa
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return http(originalRequest); // So‘rovni qayta yuborish
      } catch (refreshError) {
        // Logout yoki boshqa redirect
        console.error("Foydalanuvchini chiqarib yuborish kerak " + refreshError);
        // Misol: window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default http;
