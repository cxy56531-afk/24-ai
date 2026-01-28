import React from 'react';
import MagicInput from './overview/MagicInput';
import MoneySavedWidget from './overview/MoneySavedWidget';
import LiveActionFeed from './overview/LiveActionFeed';

interface OverviewProps {
  onViewChange: (view: any) => void;
}

const Overview: React.FC<OverviewProps> = ({ onViewChange }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. Hero / Magic Input Section */}
      <section className="flex flex-col items-center">
        <MagicInput />
      </section>

      {/* 2. Main Command Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
        
        {/* Left Column: Money Saved (3/12) */}
        <div className="lg:col-span-4 h-full">
          <MoneySavedWidget />
        </div>

        {/* Right Column: Live Feed (9/12) */}
        <div className="lg:col-span-8 h-full">
          <LiveActionFeed />
        </div>
      </div>

    </div>
  );
};

export default Overview;
