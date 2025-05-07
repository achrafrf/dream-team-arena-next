
import React from 'react';
import { useTeam } from '../context/TeamContext';

const TeamInfo = () => {
  const { 
    selectedTeam, 
    totalSpent, 
    remainingBudget, 
    selectedFormation, 
    formations, 
    changeFormation,
    saveTeam
  } = useTeam();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Team</h2>
        <button 
          onClick={saveTeam}
          className="px-4 py-2 bg-fantasy-purple text-white rounded-md hover:bg-fantasy-dark-purple transition-colors"
        >
          Save Team
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-fantasy-light-gray rounded-md p-3">
          <span className="block text-sm text-gray-600">Players</span>
          <span className="text-xl font-bold">{selectedTeam.length}/11</span>
        </div>
        
        <div className="bg-fantasy-light-gray rounded-md p-3">
          <span className="block text-sm text-gray-600">Formation</span>
          <span className="text-xl font-bold">{selectedFormation.name}</span>
        </div>
        
        <div className="bg-fantasy-light-gray rounded-md p-3">
          <span className="block text-sm text-gray-600">Spent</span>
          <span className="text-xl font-bold">£{totalSpent}m</span>
        </div>
        
        <div className="bg-fantasy-light-gray rounded-md p-3">
          <span className="block text-sm text-gray-600">Remaining</span>
          <span className={`text-xl font-bold ${remainingBudget < 0 ? 'text-red-500' : 'text-green-600'}`}>
            £{remainingBudget}m
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">Formation</h3>
        <div className="flex flex-wrap gap-2">
          {formations.map(formation => (
            <button
              key={formation.name}
              onClick={() => changeFormation(formation)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedFormation.name === formation.name 
                  ? 'bg-fantasy-purple text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {formation.name}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-md font-semibold mb-2">Team Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Goalkeepers</span>
            <span className="text-sm font-medium">{selectedTeam.filter(p => p.position === 'GK').length}/{selectedFormation.structure[0]}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Defenders</span>
            <span className="text-sm font-medium">{selectedTeam.filter(p => p.position === 'DEF').length}/{selectedFormation.structure[1]}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Midfielders</span>
            <span className="text-sm font-medium">{selectedTeam.filter(p => p.position === 'MID').length}/{selectedFormation.structure[2]}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Forwards</span>
            <span className="text-sm font-medium">{selectedTeam.filter(p => p.position === 'FWD').length}/{selectedFormation.structure[3]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
