import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <div className="fixed top-0 flex w-16 w-screen flex-row items-center justify-center space-x-5">
      <HeaderItem>
        <Link href="/art">Art</Link>
      </HeaderItem>
      <HeaderItem>
      <Link href="/">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[3rem]">
          <span className="text-red">MG</span>GALLERY
        </h1>
      </Link>
      </HeaderItem>
      <HeaderItem>
        <Link href="/about">About</Link>
      </HeaderItem>
    </div>
  );
}

type Props = {
  children: string | JSX.Element | JSX.Element[]
}
function HeaderItem({children} : Props) : JSX.Element  {
  return <div className="header-item">{children}</div>;
}
