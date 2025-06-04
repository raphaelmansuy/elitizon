'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 group">
              <span className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-pink-600 bg-clip-text text-transparent tracking-tight">
                ELITIZON
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/" className="text-slate-700 hover:text-pink-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-pink-50">
              Home
            </Link>
            <Link href="/services" className="text-slate-700 hover:text-pink-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-pink-50">
              Services
            </Link>
            <Link href="/about" className="text-slate-700 hover:text-pink-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-pink-50">
              About
            </Link>
            <Link href="/team" className="text-slate-700 hover:text-pink-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-pink-50">
              Team
            </Link>
            <Link href="/contact" className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-pink-500 hover:to-pink-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-pink-600 focus:outline-none p-2 rounded-lg hover:bg-pink-50 transition-all duration-300"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-200/50">
              <Link href="/" className="text-slate-700 hover:text-pink-600 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-pink-50">
                Home
              </Link>
              <Link href="/services" className="text-slate-700 hover:text-pink-600 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-pink-50">
                Services
              </Link>
              <Link href="/about" className="text-slate-700 hover:text-pink-600 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-pink-50">
                About
              </Link>
              <Link href="/team" className="text-slate-700 hover:text-pink-600 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-pink-50">
                Team
              </Link>
              <Link href="/contact" className="bg-gradient-to-r from-pink-600 to-pink-500 text-white block px-4 py-3 rounded-xl text-base font-semibold mt-4 text-center transition-all duration-300">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
