import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <AboutUs/>
      <ContactUs/>
    </>
  );
};

export default LandingPage;
