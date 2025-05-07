
import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className="bg-fantasy-purple py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Build Your Dream Team?</h2>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Join thousands of managers worldwide and create your ultimate fantasy football squad today.
        </p>
        <Link 
          to="/build-team" 
          className="bg-fantasy-accent text-black font-medium px-8 py-3 rounded-lg text-lg hover:bg-opacity-90 transition-colors inline-block"
        >
          Start Now
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
