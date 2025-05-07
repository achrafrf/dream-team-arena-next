
import React from 'react';
import { Player } from '../context/TeamContext';

type PlayerCardProps = {
  player: Player;
  onSelect: (player: Player) => void;
  isSelected?: boolean;
};

const PlayerCard = ({ player, onSelect, isSelected = false }: PlayerCardProps) => {
  const positionColors = {
    GK: 'bg-yellow-500',
    DEF: 'bg-blue-500',
    MID: 'bg-green-500',
    FWD: 'bg-red-500'
  };
  
  const handleClick = () => {
    onSelect(player);
  };
  
  return (
    <div 
      className={`player-card transition-all cursor-pointer ${isSelected ? 'ring-2 ring-fantasy-accent' : 'hover:scale-105'}`}
      onClick={handleClick}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-xs text-white py-1 px-2 rounded-full ${positionColors[player.position as keyof typeof positionColors]}`}>
            {player.position}
          </span>
          <span className="text-sm font-semibold text-green-600">£{player.price}m</span>
        </div>
        
        <div className="flex items-center mb-2">
          <div className="w-12 h-12 flex-shrink-0 mr-3 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
            {player.image ? (
              <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-xl font-bold text-gray-400">
                {player.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm">{player.name}</h3>
            <p className="text-xs text-gray-600">{player.club}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-100 p-1 rounded text-center">
            <span className="block font-semibold">Form</span>
            <span className="text-fantasy-purple">{player.form}</span>
          </div>
          <div className="bg-gray-100 p-1 rounded text-center">
            <span className="block font-semibold">Points</span>
            <span className="text-fantasy-purple">{player.points}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
