import React, { useEffect } from 'react';
import { ParticlejsConfig } from './particlesjs-config';

export const ParticlesBackground = () => {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS('particles-js', ParticlejsConfig);
    }
  }, []);

  return (
    <div
      id="particles-js"
      className="overlay-content bg-black"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  );
};
