
import React from 'react';
import { OutbreakAnalysis } from '../types';

interface AnalysisGridProps {
  analysis: OutbreakAnalysis['analysis'];
}

const AnalysisItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-slate-900/70 p-4 rounded-md">
    <p className="text-sm text-slate-400">{label}</p>
    <p className="text-lg font-semibold text-sky-300">{value}</p>
  </div>
);

const AnalysisGrid: React.FC<AnalysisGridProps> = ({ analysis }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg border border-slate-700 h-full">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Core Analysis</h3>
      <div className="space-y-4">
        <AnalysisItem label="Transmission Rate (R₀)" value={analysis.transmissionRate} />
        <AnalysisItem label="Spread Velocity" value={analysis.spreadVelocity} />
        <AnalysisItem label="Population at Risk" value={analysis.populationAtRisk} />
        <AnalysisItem label="Historical Comparison" value={analysis.historicalComparison} />
      </div>
    </div>
  );
};

export default AnalysisGrid;
