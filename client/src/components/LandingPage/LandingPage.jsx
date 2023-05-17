import React from "react";
import ThemeButton from "../ThemeButton";
import logo from "../../logo/logo.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col h-screen  sm:flex-row">
      <div className="bg-black  md:w-6/12 flex items-center justify-center">
        <div className="text-center">
          <img className="p-0 m-0 w-full lg:w-auto" src={logo} alt="" />
          <p className="text-white p-0 mb-5 sm:mb-0 mt-5 lg:mt-0 tracking-widest font-thin">
            Swap but not shop!
          </p>
        </div>
      </div>
      <div className="bg-yellow-300 h-screen md:w-6/12 flex flex-col justify-center">
        <p className="text-black mt-6 sm:mt-0 text-4xl font-sans font-medium px-5 lg:px-10">
          Welcome
        </p>
        <p className="text-black font-sans py-7 px-5 lg:px-10">
          Welcome to Xchange! We are building community of readers who believe
          in the power of sharing and the joy of discovering new books.
        </p>
        <p className="text-black font-sans px-5 lg:px-10 leading-loose">
          supoprt.xchange@gmail.com <br></br> +91 70252 42453
        </p>
        <div className="flex flex-col ss:flex-row flex-wrap justify-between lg:justify-center ml-11  px-5 lg:px-10 pt-8 sm:pt-20">
          <Link to="/auth">
            <ThemeButton className="px-10 mr-2 mb-2 ">LOGIN</ThemeButton>
          </Link>
          <Link to="/auth">
            <ThemeButton className="px-10  mb-2 ">SIGN UP</ThemeButton>
          </Link>
          <Link to="/posts">
            <ThemeButton className="px-10  ml-2 mb-2 ">Quick Tour</ThemeButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
