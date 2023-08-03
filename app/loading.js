import Image from "next/image";
import Logo from "@/assets/logo.svg";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Image src={Logo} alt="logo" className=" h-[150px] w-[250px]" />
      <span className="loader" />
    </div>
  );
}
