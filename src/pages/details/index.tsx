import { MediaType } from "@/common/MediaType";
import { SodiaStatistics } from "@/common/SodiaStatistics";
import { Chart } from "@/components/Chart";
import { useChartSWR } from "@/methods/useChartSWR";
import { useUpdateChartsEffect } from "@/methods/useUpdateChartsEffect";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { LogoButton } from "@/components/LogoButton";
import { Switch } from "@/components/Switch";
import Image from "next/image";
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
        <Image
          src="/back-button.png"
          alt="back button"
          width={40}
          height={40}
        />
      </Link>
      <div className={styles.title}>
        <LogoButton media={media} /> <p>{media}</p>
      </div>
      <div className={styles.content}>
        <Switch
          onClick={setIsHeatmap}
          checked={isHeatmap}
          optionLeft="Bubble"
          optionRight="Heatmap"
        />
        <div className={styles.chart}>
          <Chart
            sodiaStatistics={sodiaStatistics}
            media={media}
            isHeatmap={isHeatmap}
          />
        </div>
      </div>
    </div>
  );
}
