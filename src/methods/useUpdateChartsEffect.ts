import { BASE_URL } from "@/common/constants";
import { SodiaStatistics } from "@/common/SodiaStatistics";
import { useEffect } from "react";
import { readStream } from "./readStream";

export const useUpdateChartsEffect = (
  setSodiaStatistics: (sodiaStatistics: SodiaStatistics[]) => void
) => {
  // Launch stream reader
  useEffect(() => {
    const callReadStream = async () => await readStream();
    callReadStream();
  }, []);

  // Fetch data once when starting the app
  useEffect(() => {
    const getStatistics = async () => {
      const response = await fetch(`${BASE_URL}/api/getStatistics`);
      const data = await response.json();
      setSodiaStatistics(data.result);
    };
    getStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
