import { LogoSvg } from "@/assets/logos/LogoSvg";
import React from "react";

export default function AuthLayout({ children }) {
  return (
    <main className="flex-center h-screen w-full bg-[#3a3c3b]">
      <div className="mx-auto lg:w-1/3 2xl:w-[25%]">
        

        <div className="w-full bg-white">{children}</div>
      </div>
    </main>
  );
}
