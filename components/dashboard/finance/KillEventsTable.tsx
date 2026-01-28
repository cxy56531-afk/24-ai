import React, { useEffect, useState } from 'react';
import { History, Undo2, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { KillEvent } from '../../../types';
import { getKillEvents, revertKillEvent } from '../../../lib/api';
import RevertModal from './RevertModal';
import StatusBadge from '../../StatusBadge';
import EmptyState from '../../EmptyState';
import LoadingSkeleton from '../../LoadingSkeleton';

const KillEventsTable: React.FC = () => {
  const [events, setEvents] = useState<KillEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<KillEvent | null>(null);

  const fetchEvents = async () => {
    try {
      const data = await getKillEvents();
      setEvents(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRevert = async (reason: string) => {
    if (!selectedEvent) return;
    try {
      await revertKillEvent(selectedEvent.id);
      // Refresh local state simulates API update
      setEvents(prev => prev.map(e => 
        e.id === selectedEvent.id 
          ? { ...e, status: 'reverted', canRevert: false } 
          : e
      ));
      alert('✅ 回滚指令已提交，系统正在恢复。');
    } catch (e) {
      console.error(e);
      alert('❌ 回滚失败，请重试');
    }
  };

  const getEventStatusIcon = (status: string) => {
    switch (status) {
      case 'triggered': return <AlertOctagon className="w-3 h-3"/>;
      case 'success': return <CheckCircle2 className="w-3 h-3"/>;
      case 'reverted': return <Undo2 className="w-3 h-3"/>;
      default: return undefined;
    }
  };

  const mapStatusToLevel = (status: string) => {
      switch(status) {
          case 'triggered': return 'critical';
          case 'success': return 'success';
          case 'reverted': return 'low';
          default: return 'low';
      }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <History className="w-5 h-5 text-slate-500" />
          异常熔断记录 (Event Logs)
        </h3>
        <button onClick={fetchEvents} className="text-sm text-indigo-600 hover:underline">刷新列表</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium">
            <tr>
              <th className="px-5 py-3">触发时间</th>
              <th className="px-5 py-3">触发规则</th>
              <th className="px-5 py-3">影响金额 (止损)</th>
              <th className="px-5 py-3">状态</th>
              <th className="px-5 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4">
                  <LoadingSkeleton count={3} height="h-10" />
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                 <td colSpan={5}>
                   <EmptyState 
                     icon={CheckCircle2} 
                     title="暂无触发记录" 
                     description="您的资产很安全，未触发任何风控规则。"
                     className="border-none bg-transparent"
                   />
                 </td>
              </tr>
            ) : (
              events.map(event => (
                <tr key={event.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 text-slate-500 font-mono text-xs">
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-800">
                    {event.ruleName}
                  </td>
                  <td className="px-5 py-4 font-bold text-emerald-600">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: event.impactMoney.currency }).format(event.impactMoney.amount)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge 
                        level={mapStatusToLevel(event.status)} 
                        text={event.status === 'triggered' ? '已触发' : event.status === 'success' ? '执行成功' : '已回滚'}
                        icon={getEventStatusIcon(event.status)}
                    />
                  </td>
                  <td className="px-5 py-4 text-right">
                    {event.canRevert ? (
                      <button 
                        onClick={() => setSelectedEvent(event)}
                        className="inline-flex items-center px-3 py-1.5 border border-slate-200 shadow-sm text-xs font-medium rounded text-slate-700 bg-white hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                      >
                        <Undo2 className="w-3 h-3 mr-1.5" />
                        一键回滚
                      </button>
                    ) : (
                      <span className="text-xs text-slate-300 italic px-3">不可操作</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <RevertModal 
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onConfirm={handleRevert}
        eventTitle={selectedEvent?.ruleName || '未知规则'}
      />
    </div>
  );
};

export default KillEventsTable;
