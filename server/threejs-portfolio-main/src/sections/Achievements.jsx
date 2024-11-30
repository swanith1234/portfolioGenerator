import { useState } from "react";

const Achievements = ({ userData }) => {
  const achievementCount = userData?.achievements?.length || 0;
  console.log("achieve", achievementCount);
  const [selectedAchievementIndex, setSelectedAchievementIndex] = useState(0);

  const handleNavigation = (direction) => {
    setSelectedAchievementIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? achievementCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === achievementCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  const currentAchievement = userData.achievements[selectedAchievementIndex];

  return (
    <section className="c-space my-20">
      <p className="head-text text-center text-3xl font-bold">
        My Achievements
      </p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        {/* Achievement Details */}
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">
              {currentAchievement.title}
            </p>
            <p className="animatedText">{currentAchievement.description}</p>
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
          <p className="text-white text-center text-lg">Achievements Viewer</p>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
