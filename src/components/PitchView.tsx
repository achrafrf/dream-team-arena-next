
import React from 'react';
import { useTeam, TeamPlayer } from '../context/TeamContext';

const PitchView = () => {
  const { selectedTeam, selectedFormation, removePlayerFromTeam } = useTeam();
  
  // Create a grid based on the selected formation
  const formationRows = [
    { position: 'GK', count: selectedFormation.structure[0] },
    { position: 'DEF', count: selectedFormation.structure[1] },
    { position: 'MID', count: selectedFormation.structure[2] },
    { position: 'FWD', count: selectedFormation.structure[3] }
  ];
  
  // Find player for a specific position and position index
  const getPlayerForPosition = (position: string, positionIndex: number): TeamPlayer | undefined => {
    return selectedTeam.find(
      player => player.position === position && (!player.positionIndex || player.positionIndex === positionIndex)
    );
  };
  
  // Generate empty slots based on position and count
  const generatePositionSlots = (position: string, count: number) => {
    const slots = [];
    
    for (let i = 0; i < count; i++) {
      const player = getPlayerForPosition(position, i);
      slots.push(
        <div key={`${position}-${i}`} className="flex flex-col items-center">
          {player ? (
            <div className="player-card active w-full max-w-[120px] text-center relative">
              <button 
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                onClick={() => removePlayerFromTeam(player)}
              >
                ×
              </button>
              <div className="mb-1">
                {player.image ? (
                  <img src={player.image} alt={player.name} className="w-16 h-16 mx-auto object-cover" />
                ) : (
                  <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-400">{player.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="text-xs font-medium truncate">{player.name}</div>
              <div className="text-xs text-gray-500 truncate">{player.club}</div>
            </div>
          ) : (
            <div className="w-full max-w-[120px] h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
              <span className="text-sm text-gray-400">Empty</span>
            </div>
          )}
          <div className="mt-1 text-xs font-medium">
            {position}
          </div>
        </div>
      );
    }
    
    return slots;
  };
  
  return (
    <div className="bg-gradient-to-b from-green-600 to-green-700 rounded-lg p-4 shadow-inner">
      <div className="bg-[url('https://assets.codepen.io/285131/pitch.svg')] bg-contain bg-no-repeat bg-center h-full min-h-[500px] flex flex-col justify-between py-8">
        {formationRows.map((row, index) => (
          <div key={index} className="flex justify-around">
            {generatePositionSlots(row.position, row.count)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PitchView;
