
import React from 'react';
import { Card } from "@/components/ui/card";
import { useTeam } from '../context/TeamContext';
import playersData from '../data/players.json';

type LeaderboardEntry = {
  rank: number;
  name: string;
  teamName: string;
  points: number;
  managerName: string;
};

const TeamRanking = () => {
  const { selectedTeam } = useTeam();
  const hasTeam = selectedTeam.length > 0;
  const leaderboardData = playersData.leaderboard as LeaderboardEntry[];
  
  // Mock your team's position in the rankings
  const yourTeamRank = {
    rank: 120532,
    name: "Your Team",
    teamName: "Dream Team",
    points: 248,
    managerName: "You"
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Team Rankings</h2>
        
        {!hasTeam ? (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't created a team yet.</p>
            <p className="text-gray-500">Build your team to see your ranking!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Manager
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Top rankings */}
                {leaderboardData.slice(0, 3).map((entry) => (
                  <tr key={entry.rank} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entry.rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{entry.teamName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.managerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-fantasy-purple">
                      {entry.points}
                    </td>
                  </tr>
                ))}

                {/* Separator row */}
                <tr>
                  <td colSpan={4} className="px-6 py-3 text-center text-xs text-gray-500">
                    • • •
                  </td>
                </tr>

                {/* Your team */}
                <tr className="bg-gray-50 font-medium">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {yourTeamRank.rank}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-fantasy-purple">{yourTeamRank.teamName} (Your Team)</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {yourTeamRank.managerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-fantasy-purple">
                    {yourTeamRank.points}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-6 text-sm text-gray-500">
          <p>Rankings update every gameweek based on player performances.</p>
        </div>
      </Card>
      
      <Card className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Season Progress</h2>
        <div className="flex items-center mb-2">
          <div className="text-gray-500 w-1/3">Current Gameweek:</div>
          <div className="font-medium">26 / 38</div>
        </div>
        <div className="flex items-center mb-2">
          <div className="text-gray-500 w-1/3">Season Completion:</div>
          <div className="font-medium">68%</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-4">
          <div className="bg-fantasy-purple h-2.5 rounded-full" style={{ width: "68%" }}></div>
        </div>
      </Card>
    </div>
  );
};

export default TeamRanking;
