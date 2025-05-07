
import React from 'react';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import CallToAction from '../components/CallToAction';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <InfoSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
