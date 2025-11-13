
import React from 'react';
import { PlanPhase, ActionItem } from '../types';

const PriorityFactor: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const valueColor = () => {
    const lowerValue = value.toLowerCase();
    if (lowerValue.includes('high')) return 'text-red-400';
    if (lowerValue.includes('medium')) return 'text-yellow-400';
    if (lowerValue.includes('low')) return 'text-green-400';
    return 'text-slate-300';
  };
  
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`text-sm font-semibold ${valueColor()}`}>{value}</p>
    </div>
  );
};


const ActionItemCard: React.FC<{ item: ActionItem }> = ({ item }) => (
    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
        <h5 className="font-semibold text-sky-400">{item.action}</h5>
        <p className="mt-1 text-sm text-slate-300">{item.details}</p>
        <div className="mt-3 pt-3 border-t border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <PriorityFactor label="Lives Saved" value={item.priorityFactors.livesSaved} />
            <PriorityFactor label="Economic Impact" value={item.priorityFactors.economicImpact} />
            <PriorityFactor label="Feasibility" value={item.priorityFactors.feasibility} />
            <PriorityFactor label="Public Compliance" value={item.priorityFactors.publicCompliance} />
        </div>
    </div>
);

const PlanPhaseCard: React.FC<{ phase: PlanPhase }> = ({ phase }) => {
  return (
    <section className="bg-slate-800/50 p-6 rounded-lg shadow-lg border border-slate-700">
      <h3 className="text-2xl font-bold text-slate-100 mb-4">{phase.title}</h3>
      <div className="space-y-4">
        {phase.actions.map((action, index) => (
            <ActionItemCard key={index} item={action} />
        ))}
      </div>
    </section>
  );
};

export default PlanPhaseCard;
