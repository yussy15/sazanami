import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";
import { getSession } from "next-auth/react";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse

) {
  try {
    const session = await getSession({ req });

    if (!session?.user?.email) {
      return res.status(401).json({ error: "認証されていません。" });
    }
    const email = session.user.email;
    const result = await pool.query("SELECT role FROM users WHERE email = $1", [email]);
    switch (result.rows[0].role) {
      case "admin":
      case "manager":
        const result = await pool.query("SELECT * FROM users");
        return res.status(200).json({ members: result.rows });
      default:
        const result2 = await pool.query("SELECT name FROM users");
        return res.status(200).json({ members: result2.rows });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "データ取得に失敗しました。" });
  }
}
