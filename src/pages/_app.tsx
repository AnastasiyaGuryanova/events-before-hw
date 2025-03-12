import type { AppProps, AppContext } from "next/app";
import { trpc } from "@/shared/api";
import { SessionProvider, getSession } from "next-auth/react";

import "@/app/global.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}

App.getInitialProps = async (ctx: AppContext) => {
  return {
    pageProps: {
      session: await getSession(ctx.ctx),
    },
  };
};

export default trpc.withTRPC(App);
