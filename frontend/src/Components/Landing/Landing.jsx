import React from "react";
import Hero from "./Hero";
import InfoTabs from "./InfoTabs";
import Facilities from "./Facilities";
import Footer from "./Footer";
// import Loader from '../Loader'

const Landing = () => {
  return (
    <>
      {/* <Loader /> */}
      <div style={{ font:"'Lato', sans-serif" }}>
        <Hero />
        <InfoTabs />
        <Facilities />
        <Footer />
      </div>
    </>
  );
};

export default Landing;
