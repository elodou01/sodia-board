import { SodiaStatistics } from "@/types/SodiaStatistics";
import { Weekday } from "@/types/Weekday";
import { neon } from "@neondatabase/serverless";
import { NextApiRequest, NextApiResponse } from "next";

type Response = {
  result: Record<string, SodiaStatistics>[];
};

const DATABASE_URL =
  "postgres://neondb_owner:npg_ES3bCiqDQ2MB@ep-withered-sky-a2vd7xt6-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const payload = req.body;
  const date = new Date(payload.timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = Object.values(Weekday)[date.getDay()];
  const hour = date.getHours();
  const media = payload.media;

  // Connect to the Neon database
  const sql = neon(DATABASE_URL);
  const statistics: Record<string, SodiaStatistics>[] = await sql(
    `SELECT * FROM sodia_statistics WHERE year=${year} AND month=${month} AND day=${day} AND hour=${hour} AND media='${media}';`
  );

  if (!statistics || !statistics.length) {
    await sql(
      `INSERT INTO sodia_statistics(year, month, day, weekday, hour, media, count) VALUES (${year}, ${month}, ${day}, '${weekday}', ${hour}, '${media}', 1)`
    );
  } else {
    await sql(
      `UPDATE sodia_statistics SET COUNT = COUNT + 1 WHERE year=${year} AND month=${month} AND day=${day} AND hour=${hour} AND media='${media}';`
    );
  }

  res.status(200).json({ result: statistics });
}
