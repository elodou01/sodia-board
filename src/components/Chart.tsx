import { MediaType } from "@/common/MediaType";
import { SodiaStatistics } from "@/common/SodiaStatistics";
import { getChartOptions } from "@/methods/getChartOptions";
import { Highcharts } from "./highchartsLazyLoad";

type Props = {
  sodiaStatistics: SodiaStatistics[];
  media: MediaType;
  isHeatmap?: boolean;
};

export const Chart = ({ sodiaStatistics, media, isHeatmap = false }: Props) => {
  const chartOptions = getChartOptions(sodiaStatistics, media, isHeatmap);

  return <Highcharts options={chartOptions} />;
};
