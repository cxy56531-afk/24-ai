import React from 'react';
import KillRulesGrid from '../finance/KillRulesGrid';
import KillEventsTable from '../finance/KillEventsTable';

const FinancePage: React.FC = () => {
  return (
    <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">资金守护 (Capital Guardian)</h1>
        <p className="text-slate-500 mt-2">
          设置自动熔断机制，保护您的广告预算与库存资产。所有异常触发均需二次确认。
        </p>
      </div>
      
      {/* 1. Rules Engine */}
      <KillRulesGrid />

      {/* 2. Events Log */}
      <KillEventsTable />
    </div>
  );
};

export default FinancePage;
