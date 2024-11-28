import React, { useState } from "react";
import hamburger from "../assets/hamburger.svg";
import headerLogo from "../assets/header-logo.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about-us", label: "About Us" },
    { href: "#features", label: "Features" },
    { href: "#contact-us", label: "Contact Us" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="p-5 fixed z-20 w-full  ">
      <nav className="flex justify-between items-center max-container">
        {/* Logo */}
        <a href="/">
          <img
            src={headerLogo}
            alt="logo"
            width={129}
            height={29}
            className="m-0 w-[129px] h-[29px]"
          />
        </a>

        {/* Nav Links for larger screens */}
        <ul className="flex-1 flex justify-center items-center gap-10 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-sans-serif leading-normal font-medium text-xl text-slate-gray hover:text-amber-600"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Sign-in link */}
        <div className="flex gap-6 text-xl leading-normal font-medium font-montserrat max-lg:hidden">
          <a href="/" className="hover:text-amber-600">Sign in</a>
        </div>

        {/* Hamburger menu for smaller screens */}
        <div className="hidden max-lg:block">
          <button onClick={toggleMenu} className="p-2 focus:outline-none">
            <img src={hamburger} alt="hamburger icon" width={25} height={25} />
          </button>
        </div>
      </nav>

      {/* Full-Screen Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-30 transition-all duration-300 ease-in-out"
        >
          {/* Close button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-8 text-white text-3xl font-bold"
          >
            &times;
          </button>

          {/* Menu Items */}
          <ul className="flex flex-col items-center gap-10">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-white text-3xl font-medium hover:text-amber-500 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)} // Close menu when a link is clicked
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Sign-in link */}
          <div className="flex flex-col items-center gap-6 mt-10">
            <a
              href="/"
              className="text-white text-xl font-medium hover:text-amber-500"
              onClick={() => setIsMenuOpen(false)} // Close menu on sign-in click
            >
              Sign in
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
