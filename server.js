import dotenv from 'dotenv';  // dotenvのインポート方法を変更
dotenv.config();  // .env ファイルを読み込む

import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs'; // bcryptをインポート


// PostgreSQL接続の設定
const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  logging: false, // ログを非表示にしたい場合
});

// モデルの定義
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  classname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  classnumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',  // 'users' テーブルにマッピング
  timestamps: false,   // デフォルトの createdAt, updatedAt を使わない場合
});

// サーバーの設定
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // express.json() を使用

// PostgreSQL接続確認
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// メールアドレスの存在チェック
app.post('/api/mail', async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      // メールアドレスが存在する場合
      res.json({ exists: true });
    } else {
      // メールアドレスが存在しない場合
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// サインアップ処理
app.post('/api/signup', async (req, res) => {
  const { email, classname, classnumber, name, studentid } = req.body;

  try {
    // ユーザーが既に存在するか確認
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      // 既にユーザーが存在する場合
      return res.status(400).json({ message: 'Email is already registered' });
    }
    // 新しいユーザーを作成
    const newUser = await User.create({
      email,
      classname,
      classnumber,
      name,
      studentid,
    });

    res.status(201).json({
      message: 'User successfully created',
      user: {
        id: newUser.id,
        email: newUser.email,
        classname: newUser.classname,
        classnumber: newUser.classnumber,
        name: newUser.name,
        studentid: newUser.studentid,
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// サーバーの起動
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});