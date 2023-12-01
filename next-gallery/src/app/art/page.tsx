import { api } from "~/trpc/server";

export default function Art() {
  const post = api.post.getLatest;
  console.log(post);

  return <p>stuff</p>;
}
