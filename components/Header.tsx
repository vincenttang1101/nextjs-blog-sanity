import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import blogLogo from "../public/images/blogLogo.png";
import styles from "../styles/styles.module.css";
import { useEffect, useState } from "react";

const Header = () => {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="h-auto font-titleFont font-bold text-lg sticky top-0 z-50 px-4 py-4 text-secondaryColor bg-globalBgColor">
      {/* <main-header>*/}
      <div className={`${styles["main-header"]} max-w-7xl mx-auto`}>
        {/* <wrapper-description> */}
        <div
          className={`${styles["wrapper-description"]} flex flex-col items-center`}
        >
          <div className="flex flex-col pb-2">
            <div>
              <Link href="/">
                <Image
                  className="w-20 h-20 rounded-full"
                  src={blogLogo}
                  alt="logo"
                />
              </Link>
              <p>Tech Blog</p>
            </div>
          </div>
          <button
            className={`${styles["btn-menu"]} hidden`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              width="40px"
              height="25px"
              viewBox="0 0 52 52"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M50,12.5H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z" />
              <path d="M50,28H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z" />
              <path d="M50,43.5H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z" />
            </svg>{" "}
            Menu
          </button>
          <p
            className={`${styles["blog-description"]} text-center max-w-3xl pb-2`}
          >
            Discover the latest in technology on my blog, where I share insights
            and advice on gadgets, software, and trends. Join me on this journey
            and explore the world of tech!
          </p>
        </div>
        {/* </wrapper-description /> */}

        {/* <navbar> */}
        <div
          className={`${styles.navbar} flex items-center justify-between h-full mx-auto max-w-7xl`}
        >
          <div className="flex items-center	gap-5">
            <Link
              className="transition duration-700 hover:text-highlightColor"
              href="/"
            >
              Home
            </Link>
            <Link
              className="transition duration-700 hover:text-highlightColor"
              href="/contact"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <img
                className="w-11 h-11 rounded-full"
                src={
                  session
                    ? session?.user!.image!
                    : "https://i.ibb.co/R718FDz/stranger-logo.jpg"
                }
                alt="logo"
              />
              <p>{session ? session?.user!.name : "Hello Stranger"}</p>
            </div>
            {session ? (
              <button
                onClick={() => signOut()}
                className="border-[1px] border-secondaryColor hover:border-buttonColor px-4 py-1 text-base rounded-md hover:bg-highlightColor transition-all duration-700"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="border-[1px] border-secondaryColor hover:border-buttonColor px-4 py-1 text-base rounded-md hover:bg-highlightColor transition-all duration-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
        {/* <navbar /> */}
      </div>
      {/* <main-header />*/}

      {/* <navbar for max-width: 768px>*/}
      {isOpen && (
        <div className="flex flex-col gap-3 pt-2 px-2">
          <Link
            className="transition duration-700 hover:text-highlightColor"
            href="/"
          >
            Home
          </Link>
          <Link
            className="transition duration-700 hover:text-highlightColor"
            href="/contact"
          >
            Contact
          </Link>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <img
                className="w-11 h-11 rounded-full"
                src={
                  session
                    ? session?.user!.image!
                    : "https://i.ibb.co/R718FDz/stranger-logo.jpg"
                }
                alt="logo"
              />
              <p>{session ? session?.user!.name : "Hello Stranger"}</p>
            </div>
            <div>
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="border-[1px] border-secondaryColor hover:border-buttonColor px-4 py-1 text-base rounded-md hover:bg-highlightColor transition-all duration-700"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="border-[1px] border-secondaryColor hover:border-buttonColor px-4 py-1 text-base rounded-md hover:bg-highlightColor transition-all duration-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* <navbar for max-width: 768px />*/}
    </header>
  );
};

export default Header;
