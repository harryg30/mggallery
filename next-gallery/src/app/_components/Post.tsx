import Picture from "./Picture";

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

type postProps = {
  post: post;
};
export default function Post(props: postProps): JSX.Element {
  return (
    <>
      <div>
        <Picture imageUrl={props.post.imageUrl} />
        <p>{props.post.description}</p>
      </div>
    </>
  );
}
