import { api } from "~/trpc/server";
import Post from "../_components/Post";
type post = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  tags: string[];
  finishedDate: Date;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
};

export default async function Art() {
  const posts = await api.post.getLatest.query().then((p) => {
    return p;
  });

  return (
    <>
      <div className="container m-auto grid grid-cols-4 gap-3">
        {posts ? posts.map((p) => <Post post={p} />) : <></>}
      </div>
    </>
  );
}
