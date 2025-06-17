"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        mobileMenuButtonRef.current?.focus();
      }

      // Handle Tab key for focus management in mobile menu
      if (event.key === "Tab" && isOpen && mobileMenuRef.current) {
        const focusableElements = mobileMenuRef.current.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (event.shiftKey) {
          // Shift+Tab - if focused on first element, move to last
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab - if focused on last element, move to first
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus management for mobile menu
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      const firstMenuItem = mobileMenuRef.current.querySelector(
        "a"
      ) as HTMLElement;
      firstMenuItem?.focus();
    }
  }, [isOpen]);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !mobileMenuButtonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav
      className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full z-50 border-b border-gray-200/50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-3 group focus:outline-none focus:ring-4 focus:ring-primary-200 rounded-lg"
              aria-label="Elitizon homepage"
            >
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo_transparent.svg"
                  alt="Elitizon Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                  priority
                />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-pink-600 bg-clip-text text-transparent tracking-tight">
                Elitizon Ltd
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2" role="menubar">
            <Link
              href="/"
              className="text-slate-700 hover:text-pink-700 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-primary-200"
              role="menuitem"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-slate-700 hover:text-pink-700 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-primary-200"
              role="menuitem"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-slate-700 hover:text-pink-700 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-primary-200"
              role="menuitem"
            >
              About
            </Link>
            <Link
              href="/team"
              className="text-slate-700 hover:text-pink-700 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-primary-200"
              role="menuitem"
            >
              Team
            </Link>
            <Link
              href="/careers"
              className="text-slate-700 hover:text-pink-700 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-primary-200"
              role="menuitem"
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className="bg-gradient-to-r from-pink-700 to-pink-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-pink-600 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-200"
              role="menuitem"
              aria-label="Contact us to get started"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              ref={mobileMenuButtonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-pink-700 focus:outline-none p-2 rounded-lg hover:bg-pink-50 transition-all duration-300 focus:ring-4 focus:ring-primary-200"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className="md:hidden"
            id="mobile-menu"
            role="menu"
            aria-labelledby="mobile-menu-button"
          >
            <div className="px-2 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-200/50">
              {/* Mobile Menu Brand */}
              <div className="flex items-center justify-center space-x-2 px-4 py-2 mb-4 border-b border-gray-200/30">
                <Image
                  src="/logo_transparent.svg"
                  alt="Elitizon Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-slate-700 to-pink-600 bg-clip-text text-transparent">
                  Elitizon
                </span>
              </div>

              <Link
                href="/"
                className="text-slate-700 hover:text-pink-600 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-primary-200"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-slate-700 hover:text-pink-600 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-primary-200"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-slate-700 hover:text-pink-600 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-primary-200"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/team"
                className="text-slate-700 hover:text-pink-600 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-primary-200"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Team
              </Link>
              <Link
                href="/careers"
                className="text-slate-700 hover:text-pink-600 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-pink-50 focus:outline-none focus:ring-4 focus:ring-primary-200"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className="bg-gradient-to-r from-pink-700 to-pink-600 text-white block px-4 py-3 rounded-xl text-base font-semibold mt-4 text-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30"
                role="menuitem"
                onClick={() => setIsOpen(false)}
                aria-label="Contact us to get started"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
