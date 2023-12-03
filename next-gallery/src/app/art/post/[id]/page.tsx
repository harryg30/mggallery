import { post } from "~/types";
import { trpc } from "~/utils/trpc";

export async function generateStaticParams() {
  // const posts = trpc.post.getAllPosts.useQuery().data!;
  // return posts.map((post: post) => ({
  //   id: post.id,
  // }));
}

export default function PostViewPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const postQuery = trpc.post.byId.useQuery({ id: id });

  if (postQuery.status !== "success") {
    // won't happen since we're using `fallback: "blocking"`
    return <>Loading...</>;
  }
  const { data } = postQuery;
  return <>{data?.id}</>;
}
