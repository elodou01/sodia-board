import { MediaType } from "@/common/MediaType";
import Image from "next/image";
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
    <Image
      src={`/${media}.png`}
      data-testid={`logobutton-${media}`}
      alt={`${media} logo`}
      width={40}
      height={40}
      className={styles.socialMediaLogo}
      style={{
        backgroundColor: activeChartMedia === media ? "#BCE7FD" : "transparent",
      }}
      onClick={() => setActiveChartMedia(media)}
    />
  );
};
