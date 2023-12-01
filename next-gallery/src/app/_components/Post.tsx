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
      <a
        href="#"
        className="mt-3 block  bg-gradient-to-b from-lightPink to-red "
      >
        <img
          src={props.post.imageUrl}
          className="h-64 w-full object-cover p-1 sm:h-80 lg:h-96"
        />

        <h3 className="text-center text-lg font-bold text-gray-900 sm:text-xl">
          {props.post.description}
        </h3>
      </a>
    </>
  );
}
