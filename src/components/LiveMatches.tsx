
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useTeam } from '../context/TeamContext';

// Mock live match data
const liveMatches = [
  {
    id: 1,
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    minute: 67,
    score: "2-1",
    inProgress: true,
    yourPlayers: [
      { name: "Saka", team: "Arsenal", points: 5, action: "1 goal" },
      { name: "Palmer", team: "Chelsea", points: 3, action: "1 assist" }
    ]
  },
  {
    id: 2,
    homeTeam: "Liverpool",
    awayTeam: "Everton",
    minute: 34,
    score: "0-0",
    inProgress: true,
    yourPlayers: [
      { name: "Salah", team: "Liverpool", points: 2, action: "Playing" },
      { name: "Van Dijk", team: "Liverpool", points: 2, action: "Clean sheet (so far)" }
    ]
  },
  {
    id: 3,
    homeTeam: "Man United", 
    awayTeam: "Newcastle",
    time: "17:30",
    inProgress: false,
    yourPlayers: [
      { name: "Bruno Fernandes", team: "Man United", points: 0, action: "Not started" }
    ]
  }
];

// Upcoming matches
const upcomingMatches = [
  { id: 4, homeTeam: "Aston Villa", awayTeam: "Crystal Palace", date: "Tomorrow, 15:00" },
  { id: 5, homeTeam: "Tottenham", awayTeam: "West Ham", date: "Tomorrow, 17:30" },
  { id: 6, homeTeam: "Brighton", awayTeam: "Leicester", date: "Sunday, 14:00" }
];

const LiveMatches = () => {
  const { selectedTeam } = useTeam();
  const hasTeam = selectedTeam.length > 0;

  return (
    <div className="space-y-6">
      <Card className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Live Matches</h2>
        
        {!hasTeam ? (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't created a team yet.</p>
            <p className="text-gray-500">Build your team to track live matches!</p>
          </div>
        ) : liveMatches.filter(m => m.inProgress).length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No matches in progress right now.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {liveMatches.filter(m => m.inProgress).map((match) => (
              <div key={match.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-fantasy-purple/10 p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="animate-pulse h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                      <span className="text-sm font-medium">LIVE</span>
                      <span className="ml-2 text-sm text-gray-500">{match.minute}'</span>
                    </div>
                    <div className="text-sm font-medium">{match.score}</div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="font-medium">{match.homeTeam}</div>
                    <div className="font-medium">{match.awayTeam}</div>
                  </div>
                </div>
                
                <div className="p-4 bg-white">
                  <h4 className="text-sm font-medium mb-2">Your Players</h4>
                  {match.yourPlayers.map((player, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-t border-gray-100">
                      <div>
                        <span className="font-medium">{player.name}</span>
                        <span className="text-xs text-gray-500 ml-1">({player.team})</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-600 mr-2">{player.action}</span>
                        <span className="font-medium text-fantasy-purple">{player.points} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
      
      <Card className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Today's Fixtures</h2>
        
        <div className="space-y-3">
          {liveMatches.filter(m => !m.inProgress).map((match) => (
            <div key={match.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center w-full">
                <div className="font-medium">{match.homeTeam} vs {match.awayTeam}</div>
                <div className="text-sm text-gray-500">{match.time}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upcoming Matches</h2>
        
        <div className="space-y-3">
          {upcomingMatches.map((match) => (
            <div key={match.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center w-full">
                <div className="font-medium">{match.homeTeam} vs {match.awayTeam}</div>
                <div className="text-sm text-gray-500">{match.date}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default LiveMatches;
