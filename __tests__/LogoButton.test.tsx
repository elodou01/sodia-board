import { MediaType } from "@/common/MediaType";
import { LogoButton } from "@/components/LogoButton";
import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";

const cases = [
  MediaType.Article,
  MediaType.FacebookStatus,
  MediaType.InstagramMedia,
  MediaType.Pin,
  MediaType.TiktokVideo,
  MediaType.Tweet,
  MediaType.TwitchStream,
  MediaType.YoutubeVideo,
];

afterEach(() => {
  cleanup();
});

describe("LogoButton", () => {
  test.each(cases)(
    "given the media %s, the button renders correctly",
    (media) => {
      render(<LogoButton media={media} />);
      const button = screen.getByTestId(`logobutton-${media}`);
      expect(button).toBeInTheDocument();
    }
  );
  test.each(cases)(
    "given the media %s, the button has the corresponding logo",
    (media) => {
      render(<LogoButton media={media} />);
      const image = document.querySelector("img") as HTMLImageElement;
      expect(image.src).toContain(`${media}.png`);
    }
  );
});
