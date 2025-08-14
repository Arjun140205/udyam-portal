import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#512DA8] shadow-md w-full fixed top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
            <span className="text-[#512DA8] text-xl font-bold">MSME</span>
          </div>
          <div className="text-white">
            <h1 className="text-xl font-semibold leading-tight">सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय</h1>
            <h2 className="text-lg">Ministry of Micro, Small & Medium Enterprises</h2>
          </div>
        </div>
        <nav className="flex mt-4 space-x-8">
          <Link 
            href="/"
            className="text-white hover:bg-[#673AB7] px-3 py-2 rounded-t-md text-sm font-medium border-b-2 border-white"
          >
            Home
          </Link>
          <Link 
            href="/nic-code"
            className="text-white/90 hover:bg-[#673AB7] px-3 py-2 rounded-t-md text-sm font-medium"
          >
            NIC Code
          </Link>
          <Link 
            href="/documents"
            className="text-white/90 hover:bg-[#673AB7] px-3 py-2 rounded-t-md text-sm font-medium"
          >
            Useful Documents
          </Link>
          <Link 
            href="/verify"
            className="text-white/90 hover:bg-[#673AB7] px-3 py-2 rounded-t-md text-sm font-medium"
          >
            Print / Verify
          </Link>
          <Link 
            href="/update"
            className="text-white/90 hover:bg-[#673AB7] px-3 py-2 rounded-t-md text-sm font-medium"
          >
            Update Details
          </Link>
          <Link 
            href="/login"
            className="text-white/90 hover:bg-[#673AB7] px-3 py-2 rounded-t-md text-sm font-medium"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
