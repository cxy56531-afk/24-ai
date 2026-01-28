import React, { useState } from 'react';
import Sidebar from './dashboard/layout/Sidebar';
import Topbar from './dashboard/layout/Topbar';
import Overview from './dashboard/Overview';
import SecurityPage from './dashboard/pages/SecurityPage';
import IntelligencePage from './dashboard/pages/IntelligencePage';
import FinancePage from './dashboard/pages/FinancePage';
import GrowthPage from './dashboard/pages/GrowthPage';
import SettingsPage from './dashboard/pages/SettingsPage';

const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState('overview');

  const renderContent = () => {
    switch (currentView) {
      case 'overview': return <Overview onViewChange={setCurrentView} />;
      case 'security': return <SecurityPage />;
      case 'intelligence': return <IntelligencePage />;
      case 'finance': return <FinancePage />;
      case 'growth': return <GrowthPage />;
      case 'settings': return <SettingsPage />;
      default: return <Overview onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Fixed Sidebar */}
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64 transition-all duration-300">
        <Topbar />
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto h-[calc(100vh-64px)]">
          <div className="max-w-[1600px] mx-auto h-full flex flex-col">
             {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
