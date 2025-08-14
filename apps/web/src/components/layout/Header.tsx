import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#673ab7] w-full fixed top-0 z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="w-14 h-14 flex items-center justify-center mr-4 bg-white rounded-full p-1">
            <Image 
              src="/images/national-emblem.png" 
              alt="National Emblem" 
              width={48} 
              height={48} 
              className="object-contain"
            />
          </div>
          <div className="text-white">
            <h1 className="text-xl font-medium leading-tight text-white">सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय</h1>
            <h2 className="text-lg text-white/95">Ministry of Micro, Small & Medium Enterprises</h2>
          </div>
        </div>
        <nav className="flex mt-3 border-t border-white/20">
          <Link 
            href="/"
            className="text-white hover:bg-[#5e35b1] px-4 py-2 text-sm font-medium border-b-2 border-white"
          >
            Home
          </Link>
          <Link 
            href="/coming-soon"
            className="text-white/90 hover:bg-[#5e35b1] px-4 py-2 text-sm font-medium"
          >
            NIC Code
          </Link>
          <div className="relative group">
            <Link 
              href="/coming-soon"
              className="text-white/90 hover:bg-[#5e35b1] px-4 py-2 text-sm font-medium inline-flex items-center"
            >
              Useful Documents
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
          <div className="relative group">
            <Link 
              href="/coming-soon"
              className="text-white/90 hover:bg-[#5e35b1] px-4 py-2 text-sm font-medium inline-flex items-center"
            >
              Print / Verify
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
          <Link 
            href="/coming-soon"
            className="text-white/90 hover:bg-[#5e35b1] px-4 py-2 text-sm font-medium"
          >
            Update Details
          </Link>
          <Link 
            href="/coming-soon"
            className="text-white/90 hover:bg-[#5e35b1] px-4 py-2 text-sm font-medium"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
