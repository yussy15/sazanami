"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "../../styles/top.module.css";
import Header from "../components/Header";

const Top: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 未認証の場合、ログインページへリダイレクト
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // ログアウト処理
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return <p>読み込み中...</p>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <title>さざなみポータル</title>
      <h1 className={styles.title}>これが一応トップページ</h1>
      <h3 className={styles.subtitle}>ようこそ、{session?.user?.name}さん！</h3>
      <button onClick={handleSignOut} className={styles.button}>ログアウト</button>
    </div>
  );
};

export default Top;
