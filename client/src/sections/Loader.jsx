import React, { useState, useEffect } from "react";
import "./Loader.css";

const Loader = ({ show }) => {
  console.log("Loading", show);
  const messages = [
    "The form is getting submitted.",
    "Your portfolio is getting ready.",
    "Fetching URL.",
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Loop through messages every 2 seconds
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000);

    return () => clearInterval(messageInterval);
  }, []);

  // Ensure loader stays for at least 1 minute
  // const [forceShow, setForceShow] = useState(true);
  // useEffect(() => {
  //   const timer = setTimeout(() => setForceShow(false), 60000);
  //   return () => clearTimeout(timer);
  // }, []);

  if (!show) return null;

  return (
    <>
      <div className="loader-container">
        <div className="loader">
          <div className="loader-shadow"></div>
          <div className="loader-box"></div>
        </div>
        <div className="loader-text">{messages[currentMessageIndex]}</div>
      </div>
    </>
  );
};

export default Loader;
