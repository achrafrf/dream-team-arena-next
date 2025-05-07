
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTeam } from '../context/TeamContext';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TeamRanking from '../components/TeamRanking';
import TeamMatches from '../components/TeamMatches';
import LiveMatches from '../components/LiveMatches';
import { Trophy } from 'lucide-react';

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { selectedTeam, totalSpent } = useTeam();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
            <Card className="w-full md:w-1/3 shadow-md">
              <CardHeader className="bg-fantasy-purple text-white">
                <CardTitle className="flex items-center gap-2">
                  <Trophy size={24} /> Team Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">{selectedTeam.length > 0 ? "Your Team" : "No Team Selected"}</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="text-gray-600">Players:</span>
                    <span className="font-semibold">{selectedTeam.length}/11</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="text-gray-600">Total Value:</span>
                    <span className="font-semibold">£{totalSpent}m</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="text-gray-600">Current Rank:</span>
                    <span className="font-semibold">{selectedTeam.length > 0 ? '#120,532' : 'N/A'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="text-gray-600">Season Points:</span>
                    <span className="font-semibold">{selectedTeam.length > 0 ? '248' : '0'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="w-full md:w-2/3">
              <Tabs 
                defaultValue="overview" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full mb-6 bg-white rounded-md">
                  <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                  <TabsTrigger value="matches" className="flex-1">Match History</TabsTrigger>
                  <TabsTrigger value="live" className="flex-1">Live Matches</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-0">
                  <TeamRanking />
                </TabsContent>
                
                <TabsContent value="matches" className="mt-0">
                  <TeamMatches />
                </TabsContent>
                
                <TabsContent value="live" className="mt-0">
                  <LiveMatches />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeamPage;
