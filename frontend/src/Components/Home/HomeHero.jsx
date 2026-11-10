import React from "react";
import { HomeHeroContent } from "./HomeHeroContent.jsx";
import { HomeMockup } from "./HomeMockup.jsx";
import "./HomeHero.css";

export const HomeHero = () => {
  return (
    <main className="home-hero">
      <HomeHeroContent />
      <HomeMockup />
    </main>
  );
};

export default HomeHero;

