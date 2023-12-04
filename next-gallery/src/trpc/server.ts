import {
  createTRPCProxyClient,
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { headers, cookies } from "next/headers";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

import { appRouter, type AppRouter } from "~/server/api/root";
import { getUrl, transformer } from "./shared";
import { getServerSession } from "next-auth";

export const api = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    unstable_httpBatchStreamLink({
      url: getUrl(),
      headers() {
        return {
          cookie: cookies().toString(),
          "x-trpc-source": "rsc",
        };
      },
    }),
  ],
});
