import { BASE_URL } from "@/common/constants";

export const updateStatistics = async (media: string, timestamp: number) => {
  const response = await fetch(`${BASE_URL}/api/updateStatistics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ media, timestamp }),
  });
  await response.json();
};
