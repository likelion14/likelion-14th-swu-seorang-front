const BASE_URL = import.meta.env.VITE_BASE_URL;

export const checkAuth = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) return false;

  try {
    const res = await fetch(`${BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.ok; // 200이면 true, 401이면 false
  } catch (err) {
    return false;
  }
};