const BASE_URL = import.meta.env.VITE_BASE_URL;

export const saveRecentPage = async (
    url: string
) => {
    const accessToken =
        localStorage.getItem("accessToken");

    if (!accessToken) return;

    try {
        await fetch(
            `${BASE_URL}/api/users/recent-page`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${accessToken}`,
                },

                body: JSON.stringify({
                    url,
                }),
            }
        );
    } catch (error) {
        console.error(error);
    }
};