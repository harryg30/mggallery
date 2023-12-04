import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { api } from "~/trpc/server";
import { post } from "~/types";
import { db } from "~/server/db";

export async function generateStaticParams() {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      headers: new Headers(),
      session: null,
      db: db,
    },
  });

  const posts = helpers.post.getAllPosts.fetch().then((p) => {
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

  return (
    <>
      <img src={post?.imageUrl}></img>
      {post?.id}
    </>
  );
}
