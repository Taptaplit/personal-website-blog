import React, { ReactNode, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import {baseUrl} from "../pages/index"

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Taptaplits Blog" }: Props) => 
{
  const [email, setEmail] = useState<String>('');
  return (
    <div className="w-auto h-auto bg-gray-300 overflow-x-hidden">
      <Head>
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;1,200;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="You can find my blogs on this site :)"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <header className="fixed z-10 h-16 md:flex md:justify-center w-screen bg-gray-900">
        <nav className="w-screen md:w-4/5 flex flex-nowrap justify-around h-full items-center text-white ">
          <Link href="/">Home</Link>
          <Link href="/blogs">Blog</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>
      <div className="relative top-16">{children}</div>
      <footer className="relative bottom-0 flex p-2 bg-gray-800 justify-around items-around h-auto w-screen flex-wrap text-white">
        <div className="w-11/12 sm:w-4/5 flex flex-wrap justify-around">
          <div className="align-center flex flex-col p-1 text-center w-2/6 sm:w-auto">
            <Image src="/logo.png" height="100%" width="100%" />
            <p className="text-sm">Taptaplit&#39;s Blogs</p>
            <p className="text-xs">Read -&gt; Learn</p>
          </div>
          <div className="p-1">
            <h2 className="text-md">Explore</h2>
            <ul className="font-thin">
              <li className="text-sm">
                <Link href="/">
                  Home
                </Link>
              </li>
              <li className="text-sm">
                <Link href="/blogs">
                  Blogs
                </Link>
              </li>
              <li className="text-sm">
                <Link href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="p-1">
            <h2 className="text-md">Social Media</h2>
            <ul className="font-thin">
              <li className="text-sm">
                <Link href="https://taptaplit.tk" >
                  Portfolio
                </Link>
              </li>
              <li className="text-sm">
                <Link href="#">
                  Twitter
                </Link>
              </li>
              <li className="text-sm">
                <Link as="a" href="https://discord.gg/psxhnjF5vk" >
                  Discord
                </Link>
              </li>
            </ul>
          </div>
          <div className="p-2">
            <p className="text-md">Subscribe?</p>
            <div className="flex flex-nowrap p-1 text-black">
              <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              <button className="text-white p-1 pl-2 pr-2 bg-blue-400" onClick={async () => {
                await fetch(`${baseUrl}/blog/subscribe`, {
                  method: 'POST', // *GET, POST, PUT, DELETE, etc.
                  mode: 'cors', // no-cors, *cors, same-origin
                  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                  headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: JSON.stringify({
                    "email": email,
                  }) // body data type must match "Content-Type" header
                });
              
              }}>Submit</button>
            </div>
          </div>
        </div>
        <p className="sticky bottom-0 p-5 pb-2 text-center w-full">
          Copyright &copy; Taptaplit 2021
        </p>
      </footer>
    </div>
  );
};

export default Layout;
