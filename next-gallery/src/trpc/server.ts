import {
  createTRPCProxyClient,
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { cookies } from "next/headers";

import { type AppRouter } from "~/server/api/root";
import { getUrl, transformer } from "./shared";
import { createContext, createRouter } from "~/server/context";
import { appRouter } from "~/server/api/routers/_app";
import { createInnerTRPCContext } from "~/server/api/trpc";

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

// export const helpers = createServerSideHelpers({
//   router: appRouter,
//   ctx: await createInnerTRPCContext({}),
// });
