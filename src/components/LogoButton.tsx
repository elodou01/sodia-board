import { MediaType } from "@/common/MediaType";

import styles from "../styles/LogoButton.module.css";

type Props = {
  media: MediaType;
  activeChartMedia?: MediaType;
  setActiveChartMedia?(activeChartMedia: MediaType): void;
};

export const LogoButton = ({
  media,
  activeChartMedia,
  setActiveChartMedia = () => {},
}: Props) => {
  return (
    <img
      style={{
        backgroundColor: activeChartMedia === media ? "#BCE7FD" : "transparent",
      }}
      src={`${media}.png`}
      className={styles.socialMediaLogo}
      onClick={() => setActiveChartMedia(media)}
    />
  );
};
