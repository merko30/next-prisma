import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import "../globals.css";

export default function MyApp({
  Component,
  pageProps,
  session,
}: AppProps & { session: Session | null }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />;
    </SessionProvider>
  );
}
