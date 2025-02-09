import { BASE_URL } from "@/common/constants";
import useSWR from "swr";

export const useChartSWR = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${BASE_URL}/api/getStatistics`,
    fetcher,
    { refreshInterval: 1000 }
  );

  return { data, error, isLoading };
};
