import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Header from "../components/Header";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  // index.tsx (ルートパス) と Signup ページでヘッダーを非表示にしたい例
  const hideHeaderPaths = ["/", "/Signup"];
  const shouldShowHeader = !hideHeaderPaths.includes(router.pathname);

  return (
    <SessionProvider session={session}>
      {shouldShowHeader && <Header />}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
