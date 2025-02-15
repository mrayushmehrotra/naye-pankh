"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-100 relative"
      style={{
        backgroundImage: "url('/authBgImage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(239,120,107,0.7)] hover:border-[#EF786B] border-2 border-transparent">
        <h2 className="text-3xl font-bold text-black">Naye Pankh Foundation</h2>

        <SignedOut>
          <div className="relative items-center justify-center cursor-pointer bg-gradient-to-b from-[#EF786B] to-[#EF786B]/90 shadow-[0px_4px_32px_0px_rgba(239,120,107,0.7)] px-6 py-4 rounded-xl border-[1px] border-slate-500 text-white font-medium group overflow-hidden mt-6">
            {/* Static Text */}
            <p className="absolute top-0 left-0 w-full text-center transition-transform duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-7">
              Naye Pankh :)
            </p>

            {/* SignIn Button (Correctly Positioned) */}
            <SignInButton forceRedirectUrl="/dashboard">
              <div className="absolute top-7 left-1/2 -translate-x-1/2 w-full flex justify-center transition-all duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-0">
                <button className="text-white font-medium hover:underline">
                  Sign In
                </button>
              </div>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="mt-6 flex flex-col items-center space-y-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-6 py-3 bg-[#EF786B] text-white font-medium rounded-lg shadow-md hover:bg-orange-700 transition duration-300"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Enter the Portal</span>
            </Link>

            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Home;
