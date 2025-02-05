import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// This type does not represent the whole objects streamed.
type Event = {
  id: number;
  timestamp: number;
};

export default function Home() {
  const updateStatistics = async (media: string, timestamp: number) => {
    const response = await fetch("http://localhost:3000/api/updateStatistics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ media, timestamp }),
    });
    const data = await response.json();
    console.log(data);
  };

  const readStream = async () => {
    const response = await fetch("https://stream.upfluence.co/stream", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.body;
    const decoder = new TextDecoder();

    if (!data) return;

    const reader = data.getReader();
    let isEndOfStream = false;

    while (!isEndOfStream) {
      try {
        // Issue here !!! Infinite loop if browser is manually refreshed
        const { value, done } = await reader.read();
        isEndOfStream = done;
        const data = decoder.decode(value);
        const jsonString = data.split(/data: (.*)/)[1];
        const json = JSON.parse(jsonString);
        const eventType = Object.keys(json)[0];
        const eventInfo: Event = Object.values(json)[0] as any;
        // Add 000 to add milliseconds to timestamp
        await updateStatistics(eventType, eventInfo.timestamp * 1000);
      } catch (e) {
        console.error("error while reading stream", e);
      }
    }
  };

  // useEffect(() => {
  //   const callReadStream = async () => await readStream();
  //   callReadStream();
  // }, []);

  useEffect(() => {
    const getStatistics = async () => {
      const response = await fetch("http://localhost:3000/api/getStatistics");
      const data = await response.json();
      console.log(data);
    };
    getStatistics();
  }, []);

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
          <div className={styles.logos}>
            <img src="/instagram.png" className={styles.socialMediaLogo} />
            <img src="/youtube.png" className={styles.socialMediaLogo} />
            <img src="/pinterest.png" className={styles.socialMediaLogo} />
            <img src="/tiktok.png" className={styles.socialMediaLogo} />
            <img src="/facebook.png" className={styles.socialMediaLogo} />
            <img src="/article.png" className={styles.socialMediaLogo} />
          </div>
        </main>
      </div>
    </>
  );
}
