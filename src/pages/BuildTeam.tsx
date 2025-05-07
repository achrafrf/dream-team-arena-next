
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PlayerGrid from '../components/PlayerGrid';
import PitchView from '../components/PitchView';
import TeamInfo from '../components/TeamInfo';
import { useTeam } from '../context/TeamContext';

const BuildTeam = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gray-100 flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-fantasy-purple">Build Your Team</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <TeamInfo />
              </div>
              <div className="mb-8">
                <PitchView />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <PlayerGrid />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuildTeam;
