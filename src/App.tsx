
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TeamProvider } from "./context/TeamContext";

import Index from "./pages/Index";
import BuildTeam from "./pages/BuildTeam";
import MyTeam from "./pages/MyTeam";
import Leaderboard from "./pages/Leaderboard";
import TeamPage from "./pages/TeamPage";
import Betting from "./pages/Betting";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TeamProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/build-team" element={<BuildTeam />} />
            <Route path="/my-team" element={<MyTeam />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/betting" element={<Betting />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TeamProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
