import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ParticlesBackground } from "../features/particles/Particles";

const Homepage = () => {
  return (
    <div className="overlay-content">
      <ParticlesBackground />
      <Outlet />
    </div>
  );
};

export default Homepage;
