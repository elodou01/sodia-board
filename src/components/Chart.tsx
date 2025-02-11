import { MediaType } from "@/common/MediaType";
import { SodiaStatistics } from "@/common/SodiaStatistics";
import { Weekday } from "@/common/Weekday";
import { getBubbleOptions } from "@/methods/getBubbleOptions";
import { getHeatmapOptions } from "@/methods/getHeatmapOptions";
import { useMemo } from "react";
import { Highcharts } from "./highchartsLazyLoad";

type Props = {
  sodiaStatistics: SodiaStatistics[];
  media: MediaType;
  isHeatmap?: boolean;
};

export const Chart = ({ sodiaStatistics, media, isHeatmap = false }: Props) => {
  const dataMatrix = new Array(7).fill(0).map(() => new Array(24).fill(0));
  sodiaStatistics
    .filter((statistics) => statistics.media === media)
    .map((stat) => {
      dataMatrix[Object.keys(Weekday).indexOf(stat.weekday)][stat.hour] +=
        stat.count;
    });

  const bubbleData = dataMatrix.flatMap((dayCounts, dayIndex) =>
    dayCounts.map((count, hourIndex) => ({
      x: hourIndex,
      y: dayIndex,
      z: count,
    }))
  );
  const numberOfPosts = bubbleData.reduce((n, { z }) => n + z, 0);

  const optionsBubble = useMemo(
    () => getBubbleOptions(bubbleData, numberOfPosts),
    [bubbleData, numberOfPosts]
  );

  const heatmapData = dataMatrix.flatMap((dayCounts, dayIndex) =>
    dayCounts.map((count, hourIndex) => [hourIndex, dayIndex, count])
  );

  const optionsHeatmap = useMemo(
    () => getHeatmapOptions(heatmapData, numberOfPosts),
    [heatmapData, numberOfPosts]
  );

  const chartOptions = isHeatmap ? optionsHeatmap : optionsBubble;

  return <Highcharts options={chartOptions} />;
};
