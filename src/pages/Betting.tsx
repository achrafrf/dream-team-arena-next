
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Trophy, Flag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTeam } from "@/context/TeamContext";

type Match = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
};

type Bet = {
  matchId: number;
  prediction: 'home' | 'draw' | 'away';
  amount: number;
  potentialWinnings: number;
};

const upcomingMatches: Match[] = [
  {
    id: 1,
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    date: "Sat, 10 May",
    time: "15:00",
    homeOdds: 1.9,
    drawOdds: 3.5,
    awayOdds: 4.2
  },
  {
    id: 2,
    homeTeam: "Liverpool",
    awayTeam: "Everton",
    date: "Sun, 11 May",
    time: "14:30",
    homeOdds: 1.5,
    drawOdds: 4.0,
    awayOdds: 7.0
  },
  {
    id: 3,
    homeTeam: "Manchester City",
    awayTeam: "Manchester United",
    date: "Sun, 11 May",
    time: "17:30",
    homeOdds: 1.6,
    drawOdds: 3.8,
    awayOdds: 5.5
  },
  {
    id: 4,
    homeTeam: "Tottenham",
    awayTeam: "West Ham",
    date: "Mon, 12 May",
    time: "20:00",
    homeOdds: 2.0,
    drawOdds: 3.4,
    awayOdds: 3.8
  },
  {
    id: 5,
    homeTeam: "Brighton",
    awayTeam: "Crystal Palace",
    date: "Tue, 13 May",
    time: "19:45",
    homeOdds: 2.1,
    drawOdds: 3.2,
    awayOdds: 3.6
  }
];

const Betting = () => {
  const { toast } = useToast();
  const { selectedTeam } = useTeam();
  const [bets, setBets] = useState<Bet[]>([]);
  const [points, setPoints] = useState(1000);
  const [betAmounts, setBetAmounts] = useState<Record<number, number>>({});

  const hasTeam = selectedTeam.length > 0;

  const handleInputChange = (matchId: number, value: string) => {
    const amount = parseInt(value) || 0;
    setBetAmounts({
      ...betAmounts,
      [matchId]: amount
    });
  };

  const placeBet = (match: Match, prediction: 'home' | 'draw' | 'away') => {
    const amount = betAmounts[match.id] || 0;
    
    if (amount <= 0) {
      toast({
        title: "Invalid bet amount",
        description: "Please enter a valid amount to bet",
        variant: "destructive"
      });
      return;
    }
    
    if (amount > points) {
      toast({
        title: "Insufficient points",
        description: "You don't have enough points for this bet",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate potential winnings based on odds
    let odds = match.homeOdds;
    if (prediction === 'draw') odds = match.drawOdds;
    if (prediction === 'away') odds = match.awayOdds;
    
    const potentialWinnings = parseFloat((amount * odds).toFixed(2));
    
    // Check if already bet on this match
    const existingBetIndex = bets.findIndex(bet => bet.matchId === match.id);
    
    if (existingBetIndex !== -1) {
      // Update existing bet
      const updatedBets = [...bets];
      updatedBets[existingBetIndex] = {
        matchId: match.id,
        prediction,
        amount,
        potentialWinnings
      };
      setBets(updatedBets);
    } else {
      // Add new bet
      setBets([...bets, {
        matchId: match.id,
        prediction,
        amount,
        potentialWinnings
      }]);
    }
    
    // Deduct points if it's a new bet or update points difference if changing a bet
    if (existingBetIndex !== -1) {
      const oldAmount = bets[existingBetIndex].amount;
      setPoints(prev => prev + oldAmount - amount);
    } else {
      setPoints(prev => prev - amount);
    }
    
    toast({
      title: "Bet placed successfully",
      description: `You bet ${amount} points on ${prediction === 'home' ? match.homeTeam : prediction === 'away' ? match.awayTeam : 'a draw'}`,
      variant: "default"
    });
    
    // Clear input after betting
    setBetAmounts({
      ...betAmounts,
      [match.id]: 0
    });
  };

  const getBetForMatch = (matchId: number) => {
    return bets.find(bet => bet.matchId === matchId);
  };
  
  const getButtonVariant = (match: Match, prediction: 'home' | 'draw' | 'away') => {
    const bet = getBetForMatch(match.id);
    if (bet && bet.prediction === prediction) {
      return "default";
    }
    return "outline";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Betting Arena</h1>
          <p className="text-gray-600">Place your bets on upcoming matches and earn points!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-fantasy-purple" />
                  <span>Upcoming Matches</span>
                </CardTitle>
                <CardDescription>
                  Select a match outcome and place your bet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {upcomingMatches.map(match => {
                  const currentBet = getBetForMatch(match.id);
                  
                  return (
                    <Card key={match.id} className="overflow-hidden">
                      <CardHeader className="bg-fantasy-purple/10 py-3">
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium">{match.date}</div>
                          <div className="text-sm">{match.time}</div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="font-semibold mb-1">{match.homeTeam}</div>
                            <Badge variant="outline" className="bg-fantasy-purple/5">
                              {match.homeOdds}
                            </Badge>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold mb-1">Draw</div>
                            <Badge variant="outline" className="bg-fantasy-purple/5">
                              {match.drawOdds}
                            </Badge>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold mb-1">{match.awayTeam}</div>
                            <Badge variant="outline" className="bg-fantasy-purple/5">
                              {match.awayOdds}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-3 gap-4">
                          <Button 
                            variant={getButtonVariant(match, 'home')} 
                            size="sm"
                            onClick={() => placeBet(match, 'home')}
                            disabled={!hasTeam}
                          >
                            Home Win
                          </Button>
                          <Button 
                            variant={getButtonVariant(match, 'draw')} 
                            size="sm"
                            onClick={() => placeBet(match, 'draw')}
                            disabled={!hasTeam}
                          >
                            Draw
                          </Button>
                          <Button 
                            variant={getButtonVariant(match, 'away')} 
                            size="sm"
                            onClick={() => placeBet(match, 'away')}
                            disabled={!hasTeam}
                          >
                            Away Win
                          </Button>
                        </div>
                        
                        <div className="mt-4 flex items-center gap-2">
                          <Input 
                            type="number"
                            placeholder="Bet amount"
                            value={betAmounts[match.id] || ''}
                            onChange={(e) => handleInputChange(match.id, e.target.value)}
                            disabled={!hasTeam}
                            min="1"
                            max={points.toString()}
                            className="w-32"
                          />
                          <span className="text-sm text-gray-500">points</span>
                          
                          {currentBet && (
                            <div className="ml-auto text-sm">
                              <span className="font-medium">Current bet:</span>{' '}
                              <span>{currentBet.amount} points on {currentBet.prediction === 'home' ? match.homeTeam : currentBet.prediction === 'away' ? match.awayTeam : 'Draw'}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <div className="sticky top-4">
              <Card className="shadow-md mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="h-5 w-5 text-fantasy-purple" />
                    <span>Your Points</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-fantasy-purple">
                    {points} points
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Your Active Bets</CardTitle>
                </CardHeader>
                <CardContent>
                  {bets.length === 0 ? (
                    <p className="text-gray-500">No active bets yet</p>
                  ) : (
                    <div className="space-y-4">
                      {bets.map((bet) => {
                        const match = upcomingMatches.find(m => m.id === bet.matchId)!;
                        return (
                          <div key={bet.matchId} className="border-b pb-3 last:border-0">
                            <div className="font-medium">
                              {match.homeTeam} vs {match.awayTeam}
                            </div>
                            <div className="text-sm mt-1">
                              <span className="text-gray-500">Prediction:</span>{' '}
                              <Badge variant="secondary" className="ml-1">
                                {bet.prediction === 'home' ? match.homeTeam : 
                                 bet.prediction === 'away' ? match.awayTeam : 'Draw'}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center mt-2 text-sm">
                              <div>
                                <span className="text-gray-500">Bet:</span>{' '}
                                <span className="font-medium">{bet.amount} points</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Potential win:</span>{' '}
                                <span className="font-medium text-green-600">
                                  {bet.potentialWinnings} points
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
                {!hasTeam && (
                  <CardFooter className="bg-amber-50 p-4">
                    <p className="text-amber-800 text-sm">
                      You need to create a team before you can place bets!
                    </p>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Betting;
