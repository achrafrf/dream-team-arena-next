
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-fantasy-purple text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl lg:text-2xl">Dream Team Arena</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-fantasy-accent transition-colors">
            Home
          </Link>
          <Link to="/build-team" className="hover:text-fantasy-accent transition-colors">
            Build Team
          </Link>
          <Link to="/my-team" className="hover:text-fantasy-accent transition-colors">
            My Team
          </Link>
          <Link to="/leaderboard" className="hover:text-fantasy-accent transition-colors">
            Leaderboard
          </Link>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-fantasy-dark-purple animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="hover:bg-fantasy-purple px-4 py-2 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/build-team" 
              className="hover:bg-fantasy-purple px-4 py-2 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Build Team
            </Link>
            <Link 
              to="/my-team" 
              className="hover:bg-fantasy-purple px-4 py-2 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              My Team
            </Link>
            <Link 
              to="/leaderboard" 
              className="hover:bg-fantasy-purple px-4 py-2 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
