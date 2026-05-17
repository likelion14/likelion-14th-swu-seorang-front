import { refreshAccessToken } from "./refreshToken";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const checkAuth = async () => {
  let token =
    localStorage.getItem("accessToken");

  if (!token) return false;

  try {
    let res = await fetch(
      `${BASE_URL}/api/users/me`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // access token 만료
    if (res.status === 401) {
      const newAccessToken =
        await refreshAccessToken();

      if (!newAccessToken) {
        return false;
      }

      // 새 토큰으로 재시도
      res = await fetch(
        `${BASE_URL}/api/users/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        }
      );
    }

    return res.ok;
  } catch (err) {
    return false;
  }
};