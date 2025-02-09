import { STREAM_URL } from "@/common/constants";
import { updateStatistics } from "./updateStatistics";

// This type does not represent the whole objects streamed.
type Event = {
  id: number;
  timestamp: number;
};

export const readStream = async () => {
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
      const { value, done } = await reader.read();
      isEndOfStream = done;
      const data = decoder.decode(value);
      const jsonString = data.split(/data: (.*)/)[1];

      // Since the max size of a chunk is 4082, we ignore streamed data that is too large
      // We could merge the consecutive large chunks to avoid loosing data.
      if (!jsonString || jsonString.length > 4081) return;

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
