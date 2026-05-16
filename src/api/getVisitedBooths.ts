const BASE_URL = import.meta.env.VITE_BASE_URL;

export interface VisitedBooth {
  id: number;
  name: string;
  dayOpen: boolean;
  visited: boolean;
}

export const getVisitedBooths = async (day: number): Promise<VisitedBooth[]> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const response = await fetch(`${BASE_URL}/api/booths/visited?day=${day}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("인증되지 않은 사용자입니다.");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: VisitedBooth[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching visited booths:", error);
    throw error;
  }
};
