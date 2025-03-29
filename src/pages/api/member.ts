import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await pool.query("SELECT * FROM users");
    return res.status(200).json({ members: result.rows });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "データ取得に失敗しました。" });
  }
}
