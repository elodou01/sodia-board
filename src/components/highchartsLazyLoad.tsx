/* eslint-disable react/display-name */
/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type HighchartsReact from "highcharts-react-official";
import React from "react";

function withSuspense(fallback: NonNullable<React.ReactNode> | null) {
  // Using an arrow function is not the best of ideas because TypeScript tries to parse the generic parameter as JSX.
  // Its easier to just use an anonymous function.
  /* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
  return function Component<P extends {}, TRef>(
    WrappedComponent: React.ComponentType<P>
  ) {
    return React.forwardRef<TRef, P>((props, ref) => (
      <React.Suspense fallback={fallback}>
        <WrappedComponent ref={ref} {...props} />
      </React.Suspense>
    ));
  };
}

export const Highcharts = withSuspense("loading")(
  React.lazy(async () => {
    const highcharts = await sleep(1000).then(() => import("highcharts"));

    return Promise.all([
      import("highcharts-react-official"),
      import("highcharts/highcharts-more"),
      import("highcharts/modules/accessibility"),
    ]).then(([{ default: HighchartsReact }]) => {
      return createHighchartsReactModule({ HighchartsReact, highcharts });
    });
  })
);

function createHighchartsReactModule({
  HighchartsReact,
  highcharts,
}: {
  HighchartsReact: typeof import("highcharts-react-official")["default"];
  highcharts: typeof import("highcharts");
}) {
  const Component = React.forwardRef<
    HighchartsReact.RefObject,
    Omit<HighchartsReact.Props, "highcharts">
  >((props, ref) => (
    <HighchartsReact ref={ref} highcharts={highcharts} {...props} />
  ));

  return {
    default: Component,
  };
}

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
