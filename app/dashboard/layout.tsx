'use client';

import React from 'react';
import Sidebar from '@/components/dashboard/layout/Sidebar';
import Topbar from '@/components/dashboard/layout/Topbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64 transition-all duration-300">
        <Topbar />
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto h-[calc(100vh-64px)]">
          <div className="max-w-[1600px] mx-auto h-full flex flex-col">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}