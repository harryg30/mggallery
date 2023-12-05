import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { api } from "~/trpc/server";
import type { post } from "~/types";
import { db } from "~/server/db";
import Image from "next/image";
import Link from "next/link";

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
      <div className="flex flex-row justify-center  gap-2 p-2">
        <div className="relative flex max-h-screen flex-row bg-gradient-to-b from-lightPink to-red">
          <a href={post?.imageUrl}>
            <Image
              src={post!.imageUrl}
              alt={""}
              width={900}
              height={900}
              className="relative m-auto flex h-auto max-h-[calc(100vh-70px)] object-cover p-3"
            />
          </a>
          <div>
            <h1 className="flex p-4 text-lg">{post?.title}</h1>
            <p className="flex p-4">{post?.description}</p>
          </div>{" "}
        </div>{" "}
        <div className="back-button flex h-5 flex-col items-center justify-center bg-gradient-to-b from-lightPink to-red p-1">
          <Link href={"/art"}>x</Link>
        </div>
      </div>
    </>
  );
}
