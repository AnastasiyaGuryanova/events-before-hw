import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

import type { AppRouter } from "@/server/routes";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";

  // if (process.env.VERCEL_URL)
  //   return `https://${process.env.VERCEL_URL}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    const { ctx } = opts;
    if (typeof window !== "undefined") {
      return {
        transformer: superjson,
        links: [
          httpBatchLink({
            url: "/api/trpc",
          }),
        ],
      };
    }

    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            if (!ctx?.req?.headers) {
              return {};
            }

            const {
              // If you're using Node 18 before 18.15.0, omit the "connection" header
              connection: _connection,
              ...headers
            } = ctx.req.headers;
            return headers;
          },
        }),
      ],
    };
  },
  ssr: true,
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export * from "./schema";
