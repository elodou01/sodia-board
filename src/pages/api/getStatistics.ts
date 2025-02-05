import { SodiaStatistics } from "@/types/SodiaStatistics";
import { neon } from "@neondatabase/serverless";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: Record<string, SodiaStatistics>[];
};

const DATABASE_URL =
  "postgres://neondb_owner:npg_ES3bCiqDQ2MB@ep-withered-sky-a2vd7xt6-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Connect to the Neon database
  const sql = neon(DATABASE_URL);
  const statistics: Record<string, SodiaStatistics>[] = await sql(
    "SELECT * FROM sodia_statistics;"
  );

  res.status(200).json({ result: statistics });
}
