// -------------------------------------------------
// @filename: context.ts
// -------------------------------------------------
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerAuthSession } from "./auth";
import { db } from "./db";
import { Session } from "next-auth";

/**
 * Defines your inner context shape.
 * Add fields here that the inner context brings.
 */
interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  session: Session | null;
}
/**
 * Inner context. Will always be available in your procedures, in contrast to the outer context.
 *
 * Also useful for:
 * - testing, so you don't have to mock Next.js' `req`/`res`
 * - tRPC's `createServerSideHelpers` where we don't have `req`/`res`
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createContextInner(opts?: CreateInnerContextOptions) {
  return {
    db,
    session: opts?.session,
  };
}
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(opts: CreateNextContextOptions) {
  const session = await getServerAuthSession();

  const contextInner = await createContextInner({ session });

  return {
    ...contextInner,
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
