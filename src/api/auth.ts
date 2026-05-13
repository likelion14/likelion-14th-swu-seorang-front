const BASE_URL = import.meta.env.VITE_BASE_URL;

export const refreshAccessToken = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/api/users/refresh`,
            {
                method: "POST",

                credentials: "include",
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error("재발급 실패");
        }

        localStorage.setItem(
            "accessToken",
            data.accessToken
        );

        return data.accessToken;
    } catch (error) {
        console.error(error);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");

        window.location.href = "/login";

        return null;
    }
};