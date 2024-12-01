import React from "react";
import Navbar from '../components/Navbar';
import './Themes.css'
import portfoliotheme from '../assets/Portfolio_theme.png'
import Theme2 from '../assets/Theme_2.png'
import Theme3 from '../assets/Theme_3.png'
import Theme4 from '../assets/Theme_4.png'
import Theme5 from '../assets/Theme_5.png'
import Theme6 from '../assets/Theme_6.png'
import { Link } from "react-router-dom"




const Themes = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar Placeholder */}
      <Navbar/>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Heading and Subtext */}
        <header className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-500 mb-4 animate-fade-in mt-8">
            Portfolio Themes for Developers
          </h2>
          <p className="text-lg text-gray-600 animate-slide-up">
            Outstanding portfolio themes for developers, designed for
            inspiration.
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8">
  {/* First Card (Single Column in sm, Two Columns from md onwards) */}
  <div className="animate-fade-in">
  <Link to="/Portfolio-form">
    <div className="group relative rounded-lg bg-white shadow-md transform transition duration-500 hover:scale-105">
      <img
        src={portfoliotheme}
        alt="Theme 1"
        className="w-full h-[300px] object-fit rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500 rounded-lg">
        <p className="text-white text-lg font-bold">View Theme</p>
      </div>
    </div>
    </Link>
  </div>

  {/* Second Card */}
  <div className="animate-slide-up">
  <Link to="/Portfolio-form">
    <div className="group relative   rounded-lg bg-white shadow-md transform transition duration-500 hover:scale-105">
      <img
        src={Theme2}
        alt="Theme 2"
        className="w-full h-[300px] object-fit rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500 rounded-lg">
        <p className="text-white text-lg font-bold">View Theme</p>
      </div>
    </div>
    </Link>
  </div>

    {/* Third Card */}
    <div className="animate-slide-up">
    <Link to="/Portfolio-form">
    <div className="group relative rounded-lg bg-white shadow-md transform transition duration-500 hover:scale-105">
      <img
        src={Theme3}
        alt="Theme 3"
        className="w-full h-[300px] object-fit rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500 rounded-lg">
        <p className="text-white text-lg font-bold">View Theme</p>
      </div>
    </div>
    </Link>
  </div>

    {/* Fourth Card */}
    <div className="animate-slide-up">
    <Link to="/Portfolio-form">
    <div className="group relative  rounded-lg bg-white shadow-md transform transition duration-500 hover:scale-105">
      <img
        src={Theme4}
        alt="Theme 4"
        className="w-full h-[300px] object-fit rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500 rounded-lg">
        <p className="text-white text-lg font-bold">View Theme</p>
      </div>
    </div>
    </Link>
  </div>

    {/* Fifth Card */}
    <div className="animate-slide-up">
    <Link to="/Portfolio-form">
    <div className="group relative   rounded-lg bg-white shadow-md transform transition duration-500 hover:scale-105">
      <img
        src={Theme5}
        alt="Theme 5"
        className="w-full h-[300px] object-fit rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500 rounded-lg">
        <p className="text-white text-lg font-bold">View Theme</p>
      </div>
    </div>
    </Link>
  </div>

    {/* Sixth Card */}
    <div className="animate-slide-up">
    <Link to="/Portfolio-form">
    <div className="group relative   rounded-lg bg-white shadow-md transform transition duration-500 hover:scale-105">
      <img
        src={Theme6}
        alt="Theme 6"
        className="w-full h-[300px] object-fit rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500 rounded-lg">
        <p className="text-white text-lg font-bold">View Theme</p>
      </div>
    </div>
    </Link>
  </div>

     {/* Add more cards as needed */}
    </div>

      </div>
    </div>
  );
};

export default Themes;

