
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-gradient text-white">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Build Your Dream Football Team</h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Select your ultimate squad from the Premier League's top talent. Compete against friends and rise up the leaderboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/build-team" 
              className="bg-fantasy-accent text-black font-medium px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors text-center"
            >
              Start Building
            </Link>
            <Link 
              to="/leaderboard" 
              className="bg-white bg-opacity-20 text-white font-medium px-6 py-3 rounded-lg hover:bg-opacity-30 transition-colors text-center"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <img 
            src="https://resources.premierleague.com/premierleague/photos/players/250x250/p223094.png" 
            alt="Football Player" 
            className="max-w-full h-auto drop-shadow-xl" 
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
