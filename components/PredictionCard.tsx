import React from 'react';
import { TimeframePrediction } from '../types';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mt-4">
    <h4 className="text-md font-semibold text-sky-400 border-b border-slate-600 pb-1 mb-2">{title}</h4>
    {children}
  </div>
);

const PredictionCard: React.FC<{ prediction: TimeframePrediction }> = ({ prediction }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg border border-slate-700 h-full flex flex-col transition-all duration-300 hover:border-sky-500 hover:shadow-2xl">
      <h3 className="text-2xl font-bold text-slate-100 mb-4 text-center">{prediction.timeframe} Projection</h3>
      
      <Section title="Case Projections">
        <div className="grid grid-cols-3 gap-2 text-center">
            <div>
                <p className="text-xs text-slate-400">Best Case</p>
                <p className="font-bold text-lg text-green-400">{prediction.caseProjections.bestCase}</p>
            </div>
            <div>
                <p className="text-xs text-slate-400">Likely Case</p>
                <p className="font-bold text-lg text-yellow-400">{prediction.caseProjections.likelyCase}</p>
            </div>
            <div>
                <p className="text-xs text-slate-400">Worst Case</p>
                <p className="font-bold text-lg text-red-400">{prediction.caseProjections.worstCase}</p>
            </div>
        </div>
      </Section>
      
      <Section title="Geographic Spread">
        <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            {prediction.geographicSpread.map((region, i) => <li key={i}>{region}</li>)}
        </ul>
      </Section>

      <Section title="Healthcare System Strain">
        <p className="text-slate-300 text-sm">{prediction.healthcareStrain}</p>
      </Section>

      <Section title="Economic Impact">
        <p className="text-slate-300 text-sm">{prediction.economicImpact}</p>
      </Section>

      <Section title="Recommended Interventions">
         <ul className="space-y-2">
            {prediction.interventions.map((item, i) => (
                <li key={i} className="text-sm bg-slate-900/50 p-2 rounded-md">
                    <p className="font-semibold text-slate-200">{item.strategy}</p>
                    <p className="text-slate-400 text-xs italic">Outcome: {item.expectedOutcome}</p>
                </li>
            ))}
        </ul>
      </Section>

      <Section title="Resource Requirements">
        <div className="text-sm space-y-1 text-slate-300">
            <p><strong>PPE:</strong> {prediction.resourceRequirements.ppe}</p>
            <p><strong>Medications:</strong> {prediction.resourceRequirements.medications}</p>
            <p><strong>Hospital Capacity:</strong> {prediction.resourceRequirements.hospitalCapacity}</p>
        </div>
      </Section>
    </div>
  );
};

export default PredictionCard;
