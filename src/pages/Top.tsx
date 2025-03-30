import { signOut, useSession } from 'next-auth/react';
import { withAuth } from '../utils/withAuth';
import styles from '../styles/Top.module.css';

function Top() {
  const { data: session } = useSession();

  // ログアウト処理
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>これが一応トップページ</h1>
      <h3 className={styles.subtitle}>ようこそ、{session?.user?.name}さん！</h3>
      <button onClick={handleSignOut} className={styles.button}>ログアウト</button>
    </div>
  );
}

// withAuth
export default withAuth(Top);
