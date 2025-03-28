import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '../styles/Top.module.css';

export default function Top() {
  const { data: session } = useSession();
  const router = useRouter();
  
  // ユーザ認証をしてない状態でURL踏んだとき
  if (!session) {
    return <p>ユーザー認証がされていません</p>;
  }

  // ログアウト処理
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }); 
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>これが一応トップページ</h1>
      <h3 className={styles.subtitle}>ようこそ、{session.user?.name}さん！</h3>
      <button onClick={handleSignOut} className={styles.button}>ログアウト</button>
    </div>
  );
}
