import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetStaticPropsContext } from "next";
import { appRouter } from "~/server/api/root";
import { createContextInner } from "~/server/context";
import { api } from "~/trpc/server";
import { post } from "~/types";
import { getSession } from "next-auth/react";
import { db } from "~/server/db";

export async function generateStaticParams(
  context: GetStaticPropsContext<{ id: string }>,
) {
  const id = context.params?.id as string;
  const posts = api.post.getAllPosts.query().then((p) => {
    return p;
  });
  return (await posts).map((post: post) => ({
    id: post.id,
  }));
}

export default async function PostViewPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const post = await api.post.byId.query({ id: id }).then((x) => {
    return x;
  });

  return <>{post?.id}</>;
}
