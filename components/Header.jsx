"use client";

import Link from "next/link";
import React, { useState } from "react";
import Logo from "@/assets/logo.svg";
import { signOut, useSession, signIn } from "next-auth/react";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "./icons";
import { Button } from "@/components/ui/button";
const links = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 3,
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 6,
    title: "Registration",
    href: "/registration",
  },
];

const Header = () => {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="flex  items-center justify-between h-[90px] w-full   px-8 md:px-12 lg:px-16">
      <Link href="/">
        <Image src={Logo} alt="logo" className="h-[130px] w-[240px]" />
      </Link>
      {session.status === "authenticated" && (
        <div className="items-center justify-center hidden w-2/4 space-x-4 md:flex md:space-x-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.id}
                href={link.href}
                className={`my-2 font-sans text-base font-medium capitalize ${
                  isActive ? " font-semibold text-blue-500" : " font-medium "
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      )}
      <div className="hidden w-[15%] md:flex justify-end items-center space-x-4">
        <ThemeToggle />
        {session.status === "authenticated" ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {" "}
                <Icons.user className="w-4 h-4 mr-2" />
                <span>{session.data.user.email} </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mx-20">
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button onClick={signOut}>
                  <Icons.logout className="w-4 h-4 mr-2" />
                  <span>Log Out </span>
                </Button>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/registration">
            {" "}
            <Button className="w-[150px]">Register Now</Button>
          </Link>
        )}
      </div>

      <button
        onClick={handleNav}
        className="z-10 pr-4 cursor-pointer md:hidden"
      >
        {nav ? <Icons.close /> : <Icons.menu />}
      </button>

      {nav && (
        <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-gradient-to-b from-white to-gray-200 dark:bg-gradient-to-b dark:from-black dark:to-gray-800">
          <div className="w-[15%] flex justify-center items-center space-x-4">
            <ThemeToggle />
            {session.status === "authenticated" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {" "}
                    <Icons.user className="w-4 h-4 mr-2" />
                    <span>{session.data.user.email} </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mx-20">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button onClick={signOut}>
                      <Icons.logout className="w-4 h-4 mr-2" />
                      <span>Log Out </span>
                    </Button>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => {
                  router?.push("/dashboard/login");
                }}
              >
                <Icons.login className="w-4 h-4 mr-2" />
                <span>LogIn </span>
              </Button>
            )}
          </div>
          <div className="flex flex-col items-center justify-center w-2/4 h-[50%] space-y-8">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`my-2 font-sans  text-base font-medium capitalize ${
                    isActive
                      ? " font-semibold text-blue-500"
                      : "text-gray-800 dark:text-gray-300 font-medium "
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
