 

import React from 'react';
import Button from '../components/Button';

const Subscribe = () => {
  return (
    <section
      className="max-container p-12 flex justify-between items-center max-lg:flex-col gap-10"
      id="contact-us"
    >
      <h3 className="text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold">
        Sign Up for 
        <span className="text-amber-600"> Updates </span> & Newsletter
      </h3>
      <div className="lg:max-w-[40%] w-full flex border-amber-600 items-center gap-2 p-2 sm:border sm:border-slate-gray rounded-full max-sm:flex-col">
        <input
          type="text"
          className="flex-1 p-4 rounded-full outline-none transition-all text-gray-800"
          placeholder="subscribe@portfolioGen.com"
        />
        <div className="flex-shrink-0">
          <Button label="Sign Up" />
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
