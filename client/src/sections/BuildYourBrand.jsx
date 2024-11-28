import React from 'react';
import image4 from '../assets/image4.jpeg'
import Button from '../components/Button';

const BuildYourBrand = () => {
  return (
    <>
     <section
      id='about-us'
      className='p-12 flex justify-between items-center max-lg:flex-col gap-10 w-full max-container'
    >
      <div className='flex flex-1 flex-col'>
        <h2 className='font-palanquin capitalize text-4xl lg:max-w-lg font-bold'>
         Design your Dream 
          <span className='text-amber-600'> Portfolio</span> Today
 
        </h2>
        <p className='mt-4 lg:max-w-lg info-text'>
        PortfolioGenerator simplifies the process of creating stunning, personalized
        portfolios. With just a few easy steps, you can showcase your skills,
        projects, and achievements effortlessly, saving you valuable time while delivering
        outstanding results.
        </p>
        <p className='mt-6 lg:max-w-lg info-text'>
        Let your work shine with minimal effort and maximum impact
        </p>
        <div className='mt-11'>
          <Button label='Get Started' />
        </div>
      </div>

      <div className='flex-1 flex justify-center items-center'>
        <img
          src={image4}
          alt='product detail'
          width={570}
          height={522}
          className='object-contain'
        />
      </div>
    </section>
    
    </>
  )
}

export default BuildYourBrand