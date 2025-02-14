import { MediaType } from "@/common/MediaType";
import { SodiaStatistics } from "@/common/SodiaStatistics";
import { Button } from "@/components/Button";
import { Chart } from "@/components/Chart";
import { ChartSelection } from "@/components/ChartSelection";
import { HomeLeftSide } from "@/components/HomeLeftSide";
import { useChartSWR } from "@/methods/useChartSWR";
import { useUpdateChartsEffect } from "@/methods/useUpdateChartsEffect";
import styles from "@/styles/Home.module.css";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [sodiaStatistics, setSodiaStatistics] = useState<SodiaStatistics[]>([]);
  const [activeChartMedia, setActiveChartMedia] = useState<MediaType>(
    MediaType.InstagramMedia
  );

  const { data, error, isLoading } = useChartSWR();

  useUpdateChartsEffect(setSodiaStatistics);

  // Update charts data
  useEffect(() => {
    if (isLoading || error || !data.result) return;
    setSodiaStatistics(data.result);
  }, [data, isLoading, error]);

  return (
    <>
      <Head>
        <title>Sodia dashboard</title>
        <meta name="description" content="Social media dashboards" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <HomeLeftSide />
          <div className={styles.side}>
            <div className={styles.chartSelection}>
              <ChartSelection
                activeChartMedia={activeChartMedia}
                setActiveChartMedia={setActiveChartMedia}
              />
              <Link
                href={{
                  pathname: "/details",
                  query: { name: activeChartMedia },
                }}
              >
                <Button label="Media details" />
              </Link>
            </div>
            <Chart sodiaStatistics={sodiaStatistics} media={activeChartMedia} />
            <div className={styles.information}>
              <Image
                src="/info.png"
                alt="information icon"
                width={15}
                height={15}
              />
              If the chart update stops, refresh the browser.
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
