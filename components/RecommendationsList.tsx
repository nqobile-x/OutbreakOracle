
import React from 'react';
import { Recommendation, Priority } from '../types';

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

const priorityStyles: Record<Priority, string> = {
  [Priority.IMMEDIATE]: 'bg-red-500/80 text-white',
  [Priority.URGENT]: 'bg-orange-500/80 text-white',
  [Priority.IMPORTANT]: 'bg-yellow-500/80 text-slate-900',
};

const RecommendationsList: React.FC<RecommendationsListProps> = ({ recommendations }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg border border-slate-700 h-full">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Recommended Actions</h3>
      <ul className="space-y-4">
        {recommendations.map((rec, index) => (
          <li key={index} className="bg-slate-900/70 p-4 rounded-md border-l-4 border-sky-500">
            <div className="flex justify-between items-start">
              <p className="font-semibold text-slate-200 flex-1 pr-4">{rec.action}</p>
              <span className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${priorityStyles[rec.priority]}`}>
                {rec.priority}
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
              <span><strong>Audience:</strong> {rec.targetAudience}</span>
              <span><strong>Timeframe:</strong> {rec.timeframe}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationsList;
