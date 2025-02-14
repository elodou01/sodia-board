import { MediaType } from "@/common/MediaType";
import { LogoButton } from "./LogoButton";

import styles from "../styles/ChartSelection.module.css";

type Props = {
  activeChartMedia: MediaType;
  setActiveChartMedia(activeChartMedia: MediaType): void;
};

export const ChartSelection = ({
  activeChartMedia,
  setActiveChartMedia,
}: Props) => {
  return (
    <div className={styles.chartSelection}>
      <LogoButton
        media={MediaType.InstagramMedia}
        activeChartMedia={activeChartMedia}
        setActiveChartMedia={setActiveChartMedia}
      />
      <LogoButton
        media={MediaType.YoutubeVideo}
        activeChartMedia={activeChartMedia}
        setActiveChartMedia={setActiveChartMedia}
      />
      <LogoButton
        media={MediaType.Pin}
        activeChartMedia={activeChartMedia}
        setActiveChartMedia={setActiveChartMedia}
      />
      <LogoButton
        media={MediaType.TiktokVideo}
        activeChartMedia={activeChartMedia}
        setActiveChartMedia={setActiveChartMedia}
      />
      <LogoButton
        media={MediaType.FacebookStatus}
        activeChartMedia={activeChartMedia}
        setActiveChartMedia={setActiveChartMedia}
      />
      <LogoButton
        media={MediaType.Article}
        activeChartMedia={activeChartMedia}
        setActiveChartMedia={setActiveChartMedia}
      />
      <LogoButton
        media={MediaType.TwitchStream}
        activeChartMedia={activeChartMedia}
        setActiveChartMedia={setActiveChartMedia}
      />
      <LogoButton
        media={MediaType.Tweet}
        activeChartMedia={activeChartMedia}
        setActiveChartMedia={setActiveChartMedia}
      />
    </div>
  );
};
