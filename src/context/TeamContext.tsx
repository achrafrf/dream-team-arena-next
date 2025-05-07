
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import playersData from '../data/players.json';

export type Player = {
  id: number;
  name: string;
  club: string;
  clubCode: string;
  position: string;
  price: number;
  form: number;
  points: number;
  image: string;
};

export type TeamPlayer = Player & {
  positionIndex?: number;
};

export type Formation = {
  name: string;
  structure: number[];
};

type TeamContextType = {
  players: Player[];
  filteredPlayers: Player[];
  selectedTeam: TeamPlayer[];
  totalSpent: number;
  remainingBudget: number;
  selectedFormation: Formation;
  formations: Formation[];
  filterByPosition: (position: string | null) => void;
  filterBySearch: (searchTerm: string) => void;
  addPlayerToTeam: (player: Player, positionIndex?: number) => void;
  removePlayerFromTeam: (player: Player) => void;
  changeFormation: (formation: Formation) => void;
  saveTeam: () => void;
  loadTeam: () => void;
  resetFilters: () => void;
};

const BUDGET = 100.0;

const FORMATIONS: Formation[] = [
  { name: "4-4-2", structure: [1, 4, 4, 2] },
  { name: "4-3-3", structure: [1, 4, 3, 3] },
  { name: "3-5-2", structure: [1, 3, 5, 2] },
  { name: "5-3-2", structure: [1, 5, 3, 2] },
  { name: "3-4-3", structure: [1, 3, 4, 3] },
];

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamPlayer[]>([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [selectedFormation, setSelectedFormation] = useState<Formation>(FORMATIONS[0]);
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Initialize with data
  useEffect(() => {
    const allPlayers = playersData.players as Player[];
    setPlayers(allPlayers);
    setFilteredPlayers(allPlayers);
    
    // Try to load saved team
    loadTeam();
  }, []);
  
  // Calculate total spent whenever team changes
  useEffect(() => {
    const total = selectedTeam.reduce((sum, player) => sum + player.price, 0);
    setTotalSpent(parseFloat(total.toFixed(1)));
  }, [selectedTeam]);
  
  const remainingBudget = parseFloat((BUDGET - totalSpent).toFixed(1));
  
  const filterByPosition = (position: string | null) => {
    setCurrentFilter(position);
    
    if (position === null) {
      setFilteredPlayers(players);
    } else {
      setFilteredPlayers(players.filter(player => player.position === position));
    }
    
    // Also apply any existing search term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredPlayers(prev => 
        prev.filter(player => 
          player.name.toLowerCase().includes(lowerSearch) || 
          player.club.toLowerCase().includes(lowerSearch)
        )
      );
    }
  };
  
  const filterBySearch = (search: string) => {
    setSearchTerm(search);
    
    if (!search) {
      // Just apply position filter if there is one
      filterByPosition(currentFilter);
      return;
    }
    
    const lowerSearch = search.toLowerCase();
    
    // Start with position filter if applicable
    let baseFiltered = currentFilter 
      ? players.filter(player => player.position === currentFilter)
      : players;
      
    // Then apply search
    setFilteredPlayers(
      baseFiltered.filter(player => 
        player.name.toLowerCase().includes(lowerSearch) || 
        player.club.toLowerCase().includes(lowerSearch)
      )
    );
  };
  
  const resetFilters = () => {
    setCurrentFilter(null);
    setSearchTerm('');
    setFilteredPlayers(players);
  };
  
  const addPlayerToTeam = (player: Player, positionIndex?: number) => {
    // Check if player already in team
    if (selectedTeam.some(p => p.id === player.id)) {
      return;
    }
    
    // Check if we have enough budget
    if (totalSpent + player.price > BUDGET) {
      console.log("Not enough budget");
      return;
    }
    
    // Check max number of players by position based on formation
    const positionCounts = {
      GK: selectedTeam.filter(p => p.position === 'GK').length,
      DEF: selectedTeam.filter(p => p.position === 'DEF').length,
      MID: selectedTeam.filter(p => p.position === 'MID').length,
      FWD: selectedTeam.filter(p => p.position === 'FWD').length
    };
    
    const positionLimits = {
      GK: selectedFormation.structure[0],
      DEF: selectedFormation.structure[1],
      MID: selectedFormation.structure[2],
      FWD: selectedFormation.structure[3]
    };
    
    if (positionCounts[player.position as keyof typeof positionCounts] >= positionLimits[player.position as keyof typeof positionLimits]) {
      console.log(`Maximum ${player.position} players reached for formation ${selectedFormation.name}`);
      return;
    }
    
    // Add player with position index if provided
    const playerToAdd: TeamPlayer = { ...player };
    if (positionIndex !== undefined) {
      playerToAdd.positionIndex = positionIndex;
    }
    
    setSelectedTeam([...selectedTeam, playerToAdd]);
  };
  
  const removePlayerFromTeam = (player: Player) => {
    setSelectedTeam(selectedTeam.filter(p => p.id !== player.id));
  };
  
  const changeFormation = (formation: Formation) => {
    setSelectedFormation(formation);
    
    // Optionally clear team when changing formation
    // setSelectedTeam([]);
  };
  
  const saveTeam = () => {
    localStorage.setItem('fantasyTeam', JSON.stringify({
      team: selectedTeam,
      formation: selectedFormation,
    }));
  };
  
  const loadTeam = () => {
    const saved = localStorage.getItem('fantasyTeam');
    if (saved) {
      try {
        const { team, formation } = JSON.parse(saved);
        setSelectedTeam(team);
        setSelectedFormation(formation);
      } catch (e) {
        console.error('Error loading saved team:', e);
      }
    }
  };
  
  const value = {
    players,
    filteredPlayers,
    selectedTeam,
    totalSpent,
    remainingBudget,
    selectedFormation,
    formations: FORMATIONS,
    filterByPosition,
    filterBySearch,
    addPlayerToTeam,
    removePlayerFromTeam,
    changeFormation,
    saveTeam,
    loadTeam,
    resetFilters,
  };
  
  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};
