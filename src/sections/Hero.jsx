import React from "react";
import { useState } from "react";
import arrowRight from "../assets/arrow-right.svg";
import Button from "../components/Button";
import ShoeCard from "../components/ImageCard";
import theme2 from "../assets/Theme_2.png"
import theme3 from "../assets/Theme_3.png"
import theme4 from  "../assets/Theme_4.png"
import theme5 from "../assets/Theme_5.png"
import { Link } from "react-router-dom";
import './Hero.css'

const statistics = [
  { value: "10+", label: "Portfolios Created" },
  { value: "55+", label: "Happy Users" },
  { value: "60+", label: "Templates Available" },
];
 

const Hero = () => {
   

  return (
    <>
      <section
        id="home"
        className="p-12 w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
      >
        <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full  max-xl:padding-x pt-10">
          <p className="text-xl font-montserrat text-amber-600">
            Your Professional Identity, Elevated
          </p>

          <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold">
            <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">
              Build Your
            </span>
            <br />
            <span className="text-amber-600 inline-block mt-3">Portfolio</span>
          </h1>
          <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-10 sm:max-w-sm">
            Create a stunning, customizable portfolio to showcase your skills,
            projects, and achievements in minutes.
          </p>

          <Link to="/Themes">
            {" "}
            <Button label="Get Started" iconURL={arrowRight} />
          </Link>

          <div className="flex justify-start items-start flex-wrap w-full mt-10 gap-16">
            {statistics.map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-palanquin font-bold">
                  {stat.value}
                </p>
                <p className="leading-7 font-montserrat text-slate-gray">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

     
        <div className="relative flex-1 flex flex-col justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center">
  {/* Hero Image */}
  <div className="relative flex justify-center items-center mb-10">
    <img
      src={theme5}
      alt="Main Collection"
      width={500}
      height={400}
      className="object-contain relative z-10 animate-fadeIn rounded-lg "
    />
  </div>

  {/* Static Image Gallery with Animations */}
  <div className="flex sm:gap-6 gap-4 justify-center items-center">
    <div className="gallery-item hover:scale-105 transition-transform duration-500 ease-in-out">
      <img
        src={theme2}
        alt="Gallery Image 1"
        className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-500"
      />
    </div>
    <div className="gallery-item hover:scale-105 transition-transform duration-500 ease-in-out">
      <img
        src={theme3}
        alt="Gallery Image 2"
        className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-500"
      />
    </div>
    <div className="gallery-item hover:scale-105 transition-transform duration-500 ease-in-out">
      <img
        src={theme4}
        alt="Gallery Image 3"
        className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-500"
      />
    </div>
  </div>
</div>

      </section>
    </>
  );
};

export default Hero;
