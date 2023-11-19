import Link from "next/link";
import { boolean } from "zod";

type HeaderProps = {
  homePage?: boolean;
};

export default function Header({ homePage }: HeaderProps): JSX.Element {
  return (
    <div className="fixed top-0 flex w-16 w-screen flex-row items-center justify-center space-x-5">
      <HeaderItem>
        <Link href="/art">Art</Link>
      </HeaderItem>
      <HeaderItem>
        <Link href="/">
          {homePage == true ? (
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              <span className="text-red">MG</span>GALLERY
            </h1>
          ) : (
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-[2rem]">
              <span className="text-red">MG</span>GALLERY
            </h1>
          )}
        </Link>
      </HeaderItem>
      <HeaderItem>
        <Link href="/about">About</Link>
      </HeaderItem>
    </div>
  );
}

type ItemProps = {
  children: string | JSX.Element | JSX.Element[];
};
function HeaderItem({ children }: ItemProps): JSX.Element {
  return <div className="header-item">{children}</div>;
}
