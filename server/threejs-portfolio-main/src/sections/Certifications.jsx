import { useState } from "react";

const Certifications = ({ userData }) => {
  const certificationCount = userData?.certifications?.length || 0;
  console.log("certificationsCount", userData);
  const [selectedCertificationIndex, setSelectedCertificationIndex] =
    useState(0);

  const handleNavigation = (direction) => {
    setSelectedCertificationIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? certificationCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === certificationCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  const currentCertification =
    userData.certifications[selectedCertificationIndex];

  return (
    <section className="c-space my-20">
      <p className="head-text text-center text-3xl font-bold">
        My Certifications
      </p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        {/* Certification Details */}
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">
              {currentCertification.title}
            </p>
            <p className="animatedText">{currentCertification.description}</p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-7">
            <button
              className="arrow-btn"
              onClick={() => handleNavigation("previous")}
            >
              <img src="/assets/left-arrow.png" alt="left arrow" />
            </button>

            <button
              className="arrow-btn"
              onClick={() => handleNavigation("next")}
            >
              <img
                src="/assets/right-arrow.png"
                alt="right arrow"
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>

        {/* Placeholder */}
        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full flex items-center justify-center">
          <p className="text-white text-center text-lg">Certification Viewer</p>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
