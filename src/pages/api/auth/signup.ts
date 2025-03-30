import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, classname, classnumber, name, studentid } = req.body;

  if (!email || !classname || !classnumber || !name || !studentid) {
    return res.status(400).json({ error: 'すべてのフィールドを入力してください。' });
  }

  try {
    // データベース接続とINSERT処理
    const result = await pool.query(
      'INSERT INTO users (email, class_name, class_number, name, student_id) VALUES ($1, $2, $3, $4, $5)',
      [email, classname, classnumber, name, studentid]
    );
    
    // 成功レスポンス
    res.status(201).json({ message: 'ユーザーが登録されました。' });
  } catch (error) {
    console.error('Database error:', error);  // 詳細なエラーメッセージを出力
    res.status(500).json({ error: 'ユーザー登録中にエラーが発生しました。' });
  }
}
