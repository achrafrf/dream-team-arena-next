
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PitchView from '../components/PitchView';
import TeamInfo from '../components/TeamInfo';
import { useTeam } from '../context/TeamContext';
import { Link } from 'react-router-dom';

const MyTeam = () => {
  const { selectedTeam, loadTeam } = useTeam();
  
  useEffect(() => {
    // Load the saved team when the component mounts
    loadTeam();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gray-100 flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-fantasy-purple">My Team</h1>
          
          {selectedTeam.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              <TeamInfo />
              <PitchView />
              
              <div className="text-center">
                <Link 
                  to="/build-team" 
                  className="bg-fantasy-purple text-white font-medium px-6 py-3 rounded-lg hover:bg-fantasy-dark-purple transition-colors inline-block"
                >
                  Edit Team
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">No Team Found</h2>
              <p className="text-gray-600 mb-6">
                You haven't created a team yet or your team wasn't saved properly.
              </p>
              <Link 
                to="/build-team" 
                className="bg-fantasy-accent text-black font-medium px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors inline-block"
              >
                Build Your Team
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyTeam;
