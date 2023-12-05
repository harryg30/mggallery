/**
 * This file contains the root router of your tRPC-backend
 */
import { router } from "../../trpc";
import { postRouter } from "./post";

export const appRouter = router({
  post: postRouter,
});

export type AppRouter = typeof appRouter;
