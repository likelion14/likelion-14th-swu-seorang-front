const BASE_URL = import.meta.env.VITE_BASE_URL;

export const refreshAccessToken =
  async () => {
    const refreshToken =
      localStorage.getItem(
        "refreshToken"
      );

    if (!refreshToken) return null;

    try {
      const res = await fetch(
        `${BASE_URL}/api/users/refresh`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      if (!res.ok) {
        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "refreshToken"
        );

        return null;
      }

      const data = await res.json();

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );

      return data.accessToken;
    } catch (err) {
      return null;
    }
  };