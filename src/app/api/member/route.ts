// src/app/api/member/route.ts
import { Pool } from "pg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: Request) {
  try {
    // getServerSessionでセッションを取得
    const session = await getServerSession(authOptions);

    // セッションが存在しない場合は401を返す
    if (!session?.user?.email) {
      return NextResponse.json({ error: "認証されていません。" }, { status: 401 });
    }

    const email = session.user.email;

    // ここでSQLクエリを実行して、ユーザーの役職を取得
    const result = await pool.query("SELECT role FROM users WHERE email = $1", [email]);

    // ユーザーの役職に応じて返すデータを変更
    switch (result.rows[0].role) {
      case "admin":
      case "manager":
        const allMembers = await pool.query("SELECT * FROM users");
        return NextResponse.json({ members: allMembers.rows });
      default:
        const basicMembers = await pool.query("SELECT name FROM users");
        return NextResponse.json({ members: basicMembers.rows });
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "データ取得に失敗しました。" }, { status: 500 });
  }
}
