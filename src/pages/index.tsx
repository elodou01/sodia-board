import { Chart } from "@/components/Chart";
import { ChartSelection } from "@/components/ChartSelection";
import styles from "@/styles/Home.module.css";
import { MediaType } from "@/types/MediaType";
import { SodiaStatistics } from "@/types/SodiaStatistics";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR from "swr";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const STREAM_URL = "https://stream.upfluence.co/stream";

// This type does not represent the whole objects streamed.
type Event = {
  id: number;
  timestamp: number;
};

export default function Home() {
  const [sodiaStatistics, setSodiaStatistics] = useState<SodiaStatistics[]>([]);
  const [activeChartMedia, setActiveChartMedia] = useState<MediaType>(
    MediaType.InstagramMedia
  );

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${BASE_URL}/api/getStatistics`,
    fetcher,
    { refreshInterval: 1000 }
  );

  const updateStatistics = async (media: string, timestamp: number) => {
    const response = await fetch(`${BASE_URL}/api/updateStatistics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ media, timestamp }),
    });
    await response.json();
  };

  const readStream = async () => {
    const response = await fetch(STREAM_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const readableStream = response.body;
    const decoder = new TextDecoder();

    if (!readableStream) return;

    const reader = readableStream.getReader();
    let isEndOfStream = false;

    while (!isEndOfStream) {
      try {
        // Issue here !!! Infinite loop if browser is manually refreshed
        const { value, done } = await reader.read();
        isEndOfStream = done;
        const data = decoder.decode(value);
        const jsonString = data.split(/data: (.*)/)[1];

        if (!jsonString) return;

        const json = JSON.parse(jsonString);
        const eventType = Object.keys(json)[0];
        const eventInfo = Object.values(json)[0] as Event;
        // Add 000 to add milliseconds to timestamp
        await updateStatistics(eventType, eventInfo.timestamp * 1000);
      } catch (e) {
        console.error("error while reading stream", e);
      }
    }
  };

  useEffect(() => {
    const callReadStream = async () => await readStream();
    callReadStream();
  }, []);

  useEffect(() => {
    const getStatistics = async () => {
      const response = await fetch(`${BASE_URL}/api/getStatistics`);
      const data = await response.json();
      setSodiaStatistics(data.result);
    };
    getStatistics();
  }, []);

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
          <div className={styles.title}>
            Welcome to your social media dashboards
          </div>
          <div className={styles.subtitle}>
            Select a social media to see live usage
          </div>
          <ChartSelection
            activeChartMedia={activeChartMedia}
            setActiveChartMedia={setActiveChartMedia}
          />
          <Chart sodiaStatistics={sodiaStatistics} media={activeChartMedia} />
        </main>
      </div>
    </>
  );
}
