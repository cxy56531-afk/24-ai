'use client';

import React from 'react';
import Overview from '@/components/dashboard/Overview';

export default function DashboardOverviewPage() {
  // We pass a no-op function because Overview component expects it, 
  // but navigation is now handled by Sidebar Links.
  return <Overview onViewChange={() => {}} />;
}