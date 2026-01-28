import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Dashboard from './components/Dashboard';
import Docs from './components/Docs';
import Auth from './components/Auth';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple router logic
  const navigateTo = (page: string) => {
    // If user tries to go to dashboard but isn't logged in, send to auth
    if (page === 'dashboard' && !isAuthenticated) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  if (currentPage === 'dashboard') {
    return <Dashboard />;
  }

  if (currentPage === 'login') {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
      <Navbar onNavigate={navigateTo} currentPage={currentPage} />
      
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero onCtaClick={() => {
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }} />
            <Features />
            <Pricing onSelectPlan={() => navigateTo('login')} />
          </>
        )}
        
        {currentPage === 'pricing' && (
          <Pricing onSelectPlan={() => navigateTo('login')} />
        )}
        
        {currentPage === 'docs' && (
           <Docs />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;