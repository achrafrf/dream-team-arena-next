
import React from 'react';
import { Check } from 'lucide-react';

const InfoSection = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-fantasy-purple mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Build your fantasy football team with a budget of £100m. Choose the best players from the Premier League and compete to top the leaderboard.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-fantasy-purple h-12 w-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Select Your Formation</h3>
            <p className="text-gray-600 mb-4">
              Choose from popular formations like 4-4-2, 4-3-3, or 3-5-2 to build your team structure.
            </p>
            <ul className="space-y-2">
              {['Balanced formations', 'Flexible options', 'Strategic advantage'].map((item, index) => (
                <li key={index} className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-fantasy-purple h-12 w-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Draft Your Players</h3>
            <p className="text-gray-600 mb-4">
              Build a squad of 11 players within your £100m budget, balancing star power with value picks.
            </p>
            <ul className="space-y-2">
              {['Star players', 'Budget options', 'Form indicators'].map((item, index) => (
                <li key={index} className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-fantasy-purple h-12 w-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Compete & Win</h3>
            <p className="text-gray-600 mb-4">
              Save your team and see how you rank against other managers on our leaderboard.
            </p>
            <ul className="space-y-2">
              {['Global rankings', 'Points scoring', 'Weekly updates'].map((item, index) => (
                <li key={index} className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
