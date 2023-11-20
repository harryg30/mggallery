import { api } from "~/trpc/server";

export default async function Art() {
  const post = await api.post.getLatest;
  console.log(post);
  return <p>stuff</p>;
}
