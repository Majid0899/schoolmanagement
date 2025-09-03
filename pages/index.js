import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6`}
    >

      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl  font-bold text-gray-900 mb-4">
          Welcome to School Directory
        </h1>
       
        <p className="text-gray-700 text-lg mb-8">
          Add, view, and explore schools easily with our simple  Next.js interface.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/addSchool"
            className="px-6 py-3 hover:border hover:border-blue-600 text-blue-600 rounded-lg font-semibold shadow-md hover:shadow-blue-700 transition"
          >
            Add School
          </Link>
          <Link
            href="/showSchools"
            className="px-6 py-3 hover:border hover:border-blue-600 text-blue-600 rounded-lg font-semibold shadow-md hover:shadow-blue-700 transition"
          >
            View Schools
          </Link>
        </div>
      </div>

     
    </div>
  );
}
