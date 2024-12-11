import React from "react";
import footerLogo from "../assets/Logo.png";
import copyrightSign from "../assets/copyright-sign.svg";
import twitter from "../assets/twitter.svg";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
const Footer = () => {
  const footerLinks = [
    {
      title: "Products",
      links: [
        { name: "Air Force 1", link: "/" },
        { name: "Air Max 1", link: "/" },
        { name: "Air Jordan 1", link: "/" },
        { name: "Air Force 2", link: "/" },
        { name: "Nike Waffle Racer", link: "/" },
        { name: "Nike Cortez", link: "/" },
      ],
    },
    {
      title: "Help",
      links: [
        { name: "About us", link: "/" },
        { name: "FAQs", link: "/" },
        { name: "How it works", link: "/" },
        { name: "Privacy policy", link: "/" },
        { name: "Payment policy", link: "/" },
      ],
    },
    {
      title: "Get in touch",
      links: [
        { name: "customer@nike.com", link: "mailto:customer@nike.com" },
        { name: "+92554862354", link: "tel:+92554862354" },
      ],
    },
  ];

  const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
  ];

  return (
    <>
      <footer className="max-conatiner p-12">
        <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
          <div className="flex flex-col items-start ">
            <a href="/" className="font-bold text-white text-5xl ">
              Portfolio Gen
            </a>
            <p className="text-base text-white mt-6 leading-7 font-montserrat sm:max-w-sm">
              Get shoes ready for the new term at your nearest Nike store. Find
              Your perfect Size In Store. Get Rewards
            </p>
            <div className="flex items-center gap-5 mt-8">
              {socialMedia.map((icon) => (
                <div className="flex bg-white  justify-center  rounded-full items-center w-12 h-12">
                  <img src={icon.src} alt={icon.alt} width={24} height={24} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap">
            {footerLinks.map((section) => (
              <div key={section}>
                <h4 className="leading-normal mb-6 font-medium text-white font-montserrat text-2xl">
                  {section.title}
                </h4>
                <ul>
                  {section.links.map((link) => (
                    <li
                      className="mt-3 text-white font-montserrat text-base leading-normal hover:text-slate-gray cursor-pointer"
                      key={link.name}
                    >
                      <a>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-24 max-sm:flex-col max-sm:items-center  text-white">
          <div className="flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer">
            <img
              src={copyrightSign}
              alt="copy right sign"
              width={20}
              height={20}
              className="rounded-full m-0"
            />
            <p>Copyright. All rights reserved.</p>
          </div>
          <p className="font-montserrat cursor-pointer">Terms & Conditions</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
