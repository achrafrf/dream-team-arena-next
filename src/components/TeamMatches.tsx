
import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { useTeam } from '../context/TeamContext';

// Mock match data
const matchHistory = [
  {
    id: 1,
    gameweek: 25,
    date: "Feb 24, 2025",
    homeTeam: "Man City",
    awayTeam: "Liverpool",
    score: "2-1",
    yourPoints: 43,
    description: "De Bruyne (C) scored and assisted"
  },
  {
    id: 2,
    gameweek: 24,
    date: "Feb 17, 2025",
    homeTeam: "Arsenal",
    awayTeam: "Tottenham",
    score: "3-0",
    yourPoints: 51,
    description: "Saka scored twice, clean sheet"
  },
  {
    id: 3,
    gameweek: 23,
    date: "Feb 10, 2025",
    homeTeam: "Chelsea",
    awayTeam: "Newcastle",
    score: "1-1",
    yourPoints: 32,
    description: "Average performance across the team"
  },
  {
    id: 4,
    gameweek: 22,
    date: "Feb 3, 2025",
    homeTeam: "Man United",
    awayTeam: "Brighton",
    score: "2-2",
    yourPoints: 38,
    description: "Bruno Fernandes scored"
  },
  {
    id: 5,
    gameweek: 21,
    date: "Jan 27, 2025",
    homeTeam: "Leicester",
    awayTeam: "West Ham",
    score: "0-0",
    yourPoints: 29,
    description: "Clean sheet but no attacking returns"
  }
];

const TeamMatches = () => {
  const { selectedTeam } = useTeam();
  const hasTeam = selectedTeam.length > 0;

  return (
    <Card className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Match History</h2>
      
      {!hasTeam ? (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't created a team yet.</p>
          <p className="text-gray-500">Build your team to see match history!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {matchHistory.map((match) => (
            <div key={match.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-500">Gameweek {match.gameweek} • {match.date}</div>
                <div className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100">
                  {match.yourPoints} pts
                </div>
              </div>
              
              <div className="flex items-center justify-center my-3">
                <div className="text-right w-1/3 font-medium">{match.homeTeam}</div>
                <div className="px-4 font-bold text-center">{match.score}</div>
                <div className="w-1/3 font-medium">{match.awayTeam}</div>
              </div>
              
              <div className="mt-2 text-sm text-gray-600">
                {match.description}
              </div>
            </div>
          ))}
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </Card>
  );
};

export default TeamMatches;
