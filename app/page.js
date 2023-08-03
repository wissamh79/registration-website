"use client";
import Conform from "@/components/Conform";
import ConformDialog from "@/components/ConformDialog";
import UnConform from "@/components/UnConform";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isConform, setIsConform] = useState(false);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      {isConform ? (
        <Conform />
      ) : (
        <div className="flex flex-col items-center justify-center space-y-6">
          <UnConform />
          <div className="flex \ items-center justify-center space-x-6">
            <ConformDialog setConform={setIsConform} />
            <span className="text-xl font-semibold">OR</span>
            <Link href="/registration">
              <Button className="w-[200px]">Register Now</Button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
