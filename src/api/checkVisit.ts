const BASE_URL = import.meta.env.VITE_BASE_URL;

export interface CheckVisitResponse {
  status: number;
  message: string;
  code?: string;
  success: boolean;
}

export const checkVisit = async (boothId: number): Promise<CheckVisitResponse> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return {
      success: false,
      status: 401,
      message: "로그인이 필요합니다.",
    };
  }

  try {
    const response = await fetch(`${BASE_URL}/api/visits/${boothId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: CheckVisitResponse = await response.json();

    if (!response.ok) {
      if (response.status === 409) {
        throw new Error(data.message || "이미 방문 체크한 부스입니다.");
      }
      throw new Error(data.message || "방문 체크에 실패했습니다.");
    }

    return data;
  } catch (error) {
    console.error("Error checking visit:", error);
    throw error;
  }
};
