
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeaderboardTable from '../components/LeaderboardTable';

const Leaderboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gray-100 flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-fantasy-purple">Leaderboard</h1>
          
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Top Managers</h2>
              <p className="text-gray-600">
                These managers have built the most successful fantasy teams. See how your team compares!
              </p>
            </div>
            
            <LeaderboardTable />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;
