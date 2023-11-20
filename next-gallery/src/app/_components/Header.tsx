import Link from "next/link";
import { boolean } from "zod";

export default function Header(): JSX.Element {
  return (
    <>
      <HeaderItem>
        <Link href="/newPost">New Post</Link>
      </HeaderItem>
      <HeaderItem>
        <Link href="/art">Art</Link>
      </HeaderItem>
      <HeaderItem>
        <Link href="/">
          <h1 className="sm:text-1xl my-2 font-extrabold  tracking-tight sm:text-[1rem] lg:text-2xl lg:text-[3rem]">
            <span className="text-lightBlue">MG</span>GALLERY
          </h1>
        </Link>
      </HeaderItem>
      <HeaderItem>
        <Link href="/about">About</Link>
      </HeaderItem>
      <HeaderItem>
        <Link href="/contact">Contact</Link>
      </HeaderItem>
    </>
  );
}

type ItemProps = {
  children: string | JSX.Element | JSX.Element[];
};
function HeaderItem({ children }: ItemProps): JSX.Element {
  return <div className="header-item">{children}</div>;
}
