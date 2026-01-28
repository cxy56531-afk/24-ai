import React, { useEffect, useState } from 'react';
import ThreatList from '../security/ThreatList';
import ActionConsole from '../security/ActionConsole';
import { Threat } from '../../../types';
import { getThreats, getThreatDetail } from '../../../lib/api';

const SecurityPage: React.FC = () => {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [loadingList, setLoadingList] = useState(true);

  // Load List
  const fetchList = async () => {
    setLoadingList(true);
    try {
      const data = await getThreats();
      setThreats(data);
      // Auto-select first item on load if none selected
      if (data.length > 0 && !selectedId) {
        setSelectedId(data[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Load Detail when selection changes
  useEffect(() => {
    const loadDetail = async () => {
      if (!selectedId) {
        setSelectedThreat(null);
        return;
      }
      
      // Ideally this would fetch detail, but mock data is simple enough we can find it
      // or call api.getThreatDetail(selectedId)
      try {
        const detail = await getThreatDetail(selectedId);
        setSelectedThreat(detail || null);
      } catch (e) {
        console.error(e);
      }
    };
    loadDetail();
  }, [selectedId]);

  return (
    <div className="h-[calc(100vh-140px)] min-h-[600px] flex rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Left Panel: List (40%) */}
      <div className="w-[350px] lg:w-[400px] flex-shrink-0 h-full">
        <ThreatList 
          threats={threats} 
          selectedId={selectedId} 
          onSelect={setSelectedId}
          isLoading={loadingList}
        />
      </div>

      {/* Right Panel: Console (60%) */}
      <div className="flex-1 h-full min-w-0">
        <ActionConsole 
          threat={selectedThreat}
          onRefresh={fetchList}
        />
      </div>

    </div>
  );
};

export default SecurityPage;
