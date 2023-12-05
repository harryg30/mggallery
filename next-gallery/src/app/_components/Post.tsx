import type { post } from "~/types";
import Image from "next/image";

type postProps = {
  post: post;
};
export default function Post(props: postProps): JSX.Element {
  return (
    <>
      <a
        href={"art/post/" + props.post.id}
        className="mt-3 block  rounded bg-gradient-to-b from-lightPink to-red hover:shadow-lg "
      >
        <Image
          src={props.post.imageUrl}
          alt={""}
          width={900}
          height={900}
          className="h-64 w-full rounded object-cover p-2 hover:p-1 sm:h-80 lg:h-96"
        />

        <h3 className="text-center text-lg font-bold text-gray-900 sm:text-xl">
          {props.post.title}
        </h3>
      </a>
    </>
  );
}
