import React from "react";
import { useState } from "react";
import arrowRight from "../assets/arrow-right.svg";
import Button from "../components/Button";
import ShoeCard from "../components/ImageCard";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.jpeg";
import thumbnailImg1 from "../assets/thumbnailImg1.png";
import thumbnailImg2 from "../assets/thumbnailImg2.png";
import thumbnailImg3 from "../assets/thumbnailImg3.jpeg";
import { Link } from "react-router-dom";
const statistics = [
  { value: "10+", label: "Portfolios Created" },
  { value: "55+", label: "Happy Users" },
  { value: "60+", label: "Templates Available" },
];
const shoes = [
  {
    thumbnail: thumbnailImg1,
    image: image1,
  },
  {
    thumbnail: thumbnailImg2,
    image: image2,
  },
  {
    thumbnail: thumbnailImg3,
    image: image3,
  },
];

const Hero = () => {
  const [bigShoeImg, setBigShoeImg] = useState(image1);

  return (
    <>
      <section
        id="home"
        className="p-12 w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
      >
        <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full  max-xl:padding-x pt-28">
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
          <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
            Create a stunning, customizable portfolio to showcase your skills,
            projects, and achievements in minutes.
          </p>

          <Link to="/Portfolio-form">
            {" "}
            <Button label="Get Started" iconURL={arrowRight} />
          </Link>

          <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
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

        <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center">
          <img
            src={bigShoeImg}
            alt="shoe colletion"
            width={610}
            height={502}
            className="object-contain relative z-10"
          />

          <div className="flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6">
            {shoes.map((image, index) => (
              <div key={index}>
                <ShoeCard
                  index={index}
                  imgUrl={image}
                  changeBigShoeImage={(shoe) => setBigShoeImg(shoe)}
                  bigShoeImg={bigShoeImg}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
