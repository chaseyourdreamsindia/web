import React from "react";
import Logo from "../logo.png";

const Header = () => {
  return (
    <div
      className="p-3 flex flex-row items-center gap-5 pl-5 header xl:bg-white"
      data-aos="fade-dow"
    >
      <div className="xl:hidden">
        <i class="fa-solid fa-bars cursor-pointer"></i>
      </div>
      <img src={Logo} alt="logo" className="xl:h-20 h-12 mx-auto" />
      <div className="w-full xl:block hidden">
        <ul className="playfair flex flex-row justify-evenly w-full header-ul cursor-pointer items-center">
          <a href="/">
            <li className="border-r-2 pr-10">Home</li>
          </a>
          <a href="/about">
            <li className="border-r-2 pr-10">About Us</li>
          </a>
          <a href="/services">
            <li className="border-r-2 pr-10">Services</li>
          </a>
          <li className="border-r-2 pr-10">Testimonials</li>
          <a href="/gallery">
            <li className="border-r-2 pr-10">Media & Gallery</li>
          </a>
          <a href="/contact">
            <li className="border-r-2 pr-10">Contact Us</li>
          </a>
          <a href="/policy">
            <li className="border-r-2 pr-10">Privacy Policy</li>
          </a>
          <a href="/terms">
            <li className="border-r-2 pr-10">Terms and Conditions</li>
          </a>
          <a href="/login">
            <i className="fa-solid fa-user"></i>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Header;
