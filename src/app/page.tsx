"use client";

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/page.module.css';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      if (session?.user?.email) {
        const response = await fetch('/api/auth/check-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: session.user.email }),
        });

        const result = await response.json();

        if (result.registered) {
          router.push('/Top');
        } else {
          router.push('/Signup');
        }
      }
    };

    checkUser();
  }, [session, router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>さざなみポータル</h1>
      <h3 className={styles.subtitle}>組織内のGoogleアカウントのみが認証可能です</h3>
      <button
        onClick={() => signIn('google')}
        className={styles.button}
      >
        Googleで続ける
      </button>
    </div>
  );
}
