import { MediaType } from "@/common/MediaType";
import { SodiaStatistics } from "@/common/SodiaStatistics";
import { Chart } from "@/components/Chart";
import { useChartSWR } from "@/methods/useChartSWR";
import { useUpdateChartsEffect } from "@/methods/useUpdateChartsEffect";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { LogoButton } from "@/components/LogoButton";
import styles from "../../styles/Details.module.css";

export default function Details() {
  const [sodiaStatistics, setSodiaStatistics] = useState<SodiaStatistics[]>([]);
  const [isHeatmap, setIsHeatmap] = useState(false);
  const { data, error, isLoading } = useChartSWR();

  const router = useRouter();
  const media = router.query.name as MediaType;

  useUpdateChartsEffect(setSodiaStatistics);

  // Update charts data
  useEffect(() => {
    if (isLoading || error || !data.result) return;
    setSodiaStatistics(data.result);
  }, [data, isLoading, error]);

  return (
    <div className={styles.details}>
      <Link href="/">
        <img className={styles.backButton} src="back-button.png"></img>
      </Link>
      <LogoButton media={media} />
      <div className={styles.switchWithLabels}>
        <div style={{ opacity: isHeatmap ? "0.7" : "1" }}>Bubble</div>
        <label className={styles.switch}>
          <input type="checkbox" onClick={() => setIsHeatmap(!isHeatmap)} />
          <span className={styles.slider} />
        </label>
        <div style={{ opacity: isHeatmap ? "1" : "0.7" }}>Heatmap</div>
      </div>
      <Chart
        sodiaStatistics={sodiaStatistics}
        media={media}
        isHeatmap={isHeatmap}
      />
    </div>
  );
}
