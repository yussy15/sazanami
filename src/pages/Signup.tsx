import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Signup.module.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [classname, setClassname] = useState('');
  const [classnumber, setClassnumber] = useState('');
  const [name, setName] = useState('');
  const [studentid, setStudentid] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, classname, classnumber, name, studentid }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('登録が完了しました！');
      router.push('/Top');
    } else {
      alert(result.error || 'エラーが発生しました');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['form-container']}>
        <h1 className={styles.title}>サインアップ</h1>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>メールアドレス:</label>
          <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label className={styles.label}>クラス名:</label>
          <input className={styles.input} type="text" value={classname} onChange={(e) => setClassname(e.target.value)} required />

          <label className={styles.label}>クラス番号:</label>
          <input className={styles.input} type="text" value={classnumber} onChange={(e) => setClassnumber(e.target.value)} required />

          <label className={styles.label}>名前:</label>
          <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label className={styles.label}>学籍番号:</label>
          <input className={styles.input} type="text" value={studentid} onChange={(e) => setStudentid(e.target.value)} required />

          <button className={styles.button} type="submit">登録</button> {/* ローカルクラス button を適用 */}
        </form>
      </div>
    </div>
  );
}
