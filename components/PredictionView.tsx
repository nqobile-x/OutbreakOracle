
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { OutbreakAnalysis } from '../types';

interface PredictionViewProps {
  predictiveModel: OutbreakAnalysis['predictiveModel'];
}

const PredictionView: React.FC<PredictionViewProps> = ({ predictiveModel }) => {
  const chartData = useMemo(() => {
    const day7 = parseInt(predictiveModel['7dayProjection'].replace(/,/g, ''), 10) || 0;
    const day30 = parseInt(predictiveModel['30dayProjection'].replace(/,/g, ''), 10) || 0;
    
    return [
      { name: 'Day 0', cases: 0 },
      { name: 'Day 7', cases: day7 },
      { name: 'Day 14', cases: Math.round(day7 + (day30 - day7) / 3.28) },
      { name: 'Day 21', cases: Math.round(day7 + (day30 - day7) / 1.64) },
      { name: 'Day 30', cases: day30 },
    ];
  }, [predictiveModel]);

  return (
    <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg border border-slate-700 h-full">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Predictive Model</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-slate-900/70 p-3 rounded-md">
            <p className="text-sm text-slate-400">7-Day Projection</p>
            <p className="text-lg font-semibold text-sky-300">{predictiveModel['7dayProjection']} cases</p>
        </div>
        <div className="bg-slate-900/70 p-3 rounded-md">
            <p className="text-sm text-slate-400">30-Day Projection</p>
            <p className="text-lg font-semibold text-sky-300">{predictiveModel['30dayProjection']} cases</p>
        </div>
        <div className="bg-slate-900/70 p-3 rounded-md">
            <p className="text-sm text-slate-400">Estimated Peak Date</p>
            <p className="text-lg font-semibold text-sky-300">{predictiveModel.peakDate}</p>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                borderColor: '#475569',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="cases" stroke="#38bdf8" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
        <div className="mt-4">
            <p className="text-sm text-slate-400 font-semibold">Additional Affected Regions:</p>
            <p className="text-slate-300">{predictiveModel.affectedRegions.join(', ')}</p>
        </div>
    </div>
  );
};

export default PredictionView;
