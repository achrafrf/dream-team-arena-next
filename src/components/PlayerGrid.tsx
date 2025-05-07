
import React, { useState } from 'react';
import { useTeam, Player } from '../context/TeamContext';
import PlayerCard from './PlayerCard';
import { Search } from 'lucide-react';

const PlayerGrid = () => {
  const { 
    filteredPlayers, 
    filterByPosition, 
    filterBySearch, 
    addPlayerToTeam,
    selectedTeam,
    resetFilters
  } = useTeam();
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterBySearch(e.target.value);
  };
  
  const handlePositionFilter = (position: string | null) => {
    filterByPosition(position);
  };
  
  const isPlayerSelected = (player: Player) => {
    return selectedTeam.some(p => p.id === player.id);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Players</h2>
      
      {/* Search & Filter */}
      <div className="mb-6">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search players or clubs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fantasy-purple"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handlePositionFilter(null)}
            className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            All
          </button>
          <button
            onClick={() => handlePositionFilter('GK')}
            className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors"
          >
            Goalkeepers
          </button>
          <button
            onClick={() => handlePositionFilter('DEF')}
            className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            Defenders
          </button>
          <button
            onClick={() => handlePositionFilter('MID')}
            className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 hover:bg-green-200 transition-colors"
          >
            Midfielders
          </button>
          <button
            onClick={() => handlePositionFilter('FWD')}
            className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 hover:bg-red-200 transition-colors"
          >
            Forwards
          </button>
          <button
            onClick={resetFilters}
            className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
      
      {/* Grid of Players */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPlayers.map(player => (
          <PlayerCard 
            key={player.id} 
            player={player} 
            onSelect={addPlayerToTeam} 
            isSelected={isPlayerSelected(player)}
          />
        ))}
        
        {filteredPlayers.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No players found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerGrid;
