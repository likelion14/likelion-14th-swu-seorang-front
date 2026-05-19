const BASE_URL = import.meta.env.VITE_BASE_URL;

export interface Booth {
  id: number;
  name: string;
  dayOpen: boolean;
  operatingTime: string;
  operatingStatus: string;
}

export const getBooths = async (day: number): Promise<Booth[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/booths?day=${day}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Booth[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching booths:", error);
    throw error;
  }
};
