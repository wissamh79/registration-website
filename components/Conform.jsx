import React from "react";
import { Icons } from "./icons";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
export default function Conform() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <Icons.check className="text-green-500 w-[200px] h-[200px]" />

        <Image src={Logo} alt="logo" className="h-[130px] w-[240px]" />
      </div>
      <p className="text-xl font-semibold">
        You have been conform by Computiq stuff
      </p>
    </div>
  );
}
