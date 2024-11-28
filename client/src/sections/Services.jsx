import React from 'react';
import ServiceCard from '../components/ServiceCard';
 
import shieldTick from '../assets/shield-tick.svg';
import support from '../assets/support.svg'

const services = [
    {
      imgURL: support,
      label: "Easy Customization",
      subtext: "Tailor your portfolio to fit your unique style with easy-to-use customization tools."
    },
    {
      imgURL: shieldTick,
      label: "Responsive Design",
      subtext: "Your portfolio looks great on any device with fully responsive, mobile-friendly layouts."
    },
    {
      imgURL: support,
      label: "Fast Setup",
      subtext: "Create a professional portfolio in minutes with our intuitive step-by-step process."
    },
  ];
  
const Services = () => {
  return (
    <>
        <section className="max-container flex flex-wrap justify-center gap-9 p-12 " id="Features"> 
{services.map((service)=>(
  <ServiceCard key={service.label} {...service}/>
))}
 {/* //!padding p-10 */}
    </section>
    </>
  )
}

export default Services