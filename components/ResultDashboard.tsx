
import React from 'react';
import { ResponsePlan, MisinformationAnalysis } from '../types';
import PlanPhaseCard from './PlanPhaseCard';

// =================================================================
// Response Plan View
// =================================================================
const ResponsePlanView: React.FC<{ data: ResponsePlan }> = ({ data }) => {
  return (
    <div className="space-y-8">
      <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-slate-700 shadow-xl">
        <h2 className="text-3xl font-bold text-sky-300">{data.planTitle}</h2>
        <div className="mt-2 flex items-center justify-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3.5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0V4.25A.75.75 0 0110 3.5zM10 12a1 1 0 100 2 1 1 0 000-2z" />
                <path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-8.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z" clipRule="evenodd" />
            </svg>
            <span className="text-lg">Target: {data.disease} in {data.location}</span>
        </div>
      </div>

      <div className="space-y-8">
        {data.planPhases.map((phase, index) => (
          <PlanPhaseCard key={index} phase={phase} />
        ))}
      </div>
    </div>
  );
};

// =================================================================
// Misinformation View
// =================================================================
const classificationStyles = {
    'Accurate': 'bg-green-500/20 text-green-400 border-green-500',
    'Misleading': 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
    'Fabricated': 'bg-red-500/20 text-red-400 border-red-500',
    'Satire': 'bg-blue-500/20 text-blue-400 border-blue-500',
};

const ratingStyles: Record<string, string> = {
    'High': 'text-green-400',
    'Credible': 'text-green-400',
    'Factual': 'text-green-400',
    'Medium': 'text-yellow-400',
    'Questionable': 'text-yellow-400',
    'Sensationalized': 'text-yellow-400',
    'Low': 'text-red-400',
    'Unverifiable': 'text-red-400',
    'Alarmist': 'text-red-400',
    'N/A': 'text-slate-400',
};


const DetailRating: React.FC<{label: string, rating: string, reasoning: string}> = ({label, rating, reasoning}) => (
    <div>
        <h4 className="text-sm font-semibold text-slate-300">{label}</h4>
        <p className={`text-lg font-bold ${ratingStyles[rating] || 'text-slate-200'}`}>{rating}</p>
        <p className="text-xs text-slate-400 mt-1">{reasoning}</p>
    </div>
);

const MisinformationView: React.FC<{ data: MisinformationAnalysis }> = ({ data }) => {
    const { overallAssessment, detailedAnalysis, detectedSignals, publicHealthImpact } = data;
    const classificationStyle = classificationStyles[overallAssessment.classification] || 'bg-slate-700';

    return (
        <div className="space-y-8">
            <div className={`p-6 rounded-lg shadow-xl border-t-4 ${classificationStyle}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-100">Misinformation Analysis</h2>
                        <p className="mt-1 text-slate-300">{overallAssessment.summary}</p>
                    </div>
                    <div className="text-center flex-shrink-0 bg-slate-900/50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-slate-400">CLASSIFICATION</p>
                        <p className={`text-2xl font-bold ${classificationStyle.split(' ')[1]}`}>{overallAssessment.classification}</p>
                        <p className="text-xs text-slate-500">Confidence: {overallAssessment.confidence}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg border border-slate-700 space-y-6">
                    <h3 className="text-xl font-bold text-sky-300 border-b border-slate-700 pb-2">Detailed Analysis</h3>
                    <DetailRating label="Scientific Accuracy" {...detailedAnalysis.scientificAccuracy} />
                    <DetailRating label="Source Credibility" {...detailedAnalysis.sourceCredibility} />
                    <DetailRating label="Sensationalism" {...detailedAnalysis.sensationalism} />
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg border border-slate-700">
                        <h3 className="text-xl font-bold text-sky-300 mb-3">Detected Signals</h3>
                        <ul className="space-y-2 list-disc list-inside">
                            {detectedSignals.map((signal, i) => (
                                <li key={i} className="text-slate-300 text-sm">{signal}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg border border-slate-700">
                        <h3 className="text-xl font-bold text-sky-300 mb-3">Public Health Impact</h3>
                        <p className="text-slate-300 text-sm">{publicHealthImpact}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// =================================================================
// Main Dashboard Router
// =================================================================
const ResultDashboard: React.FC<{ data: ResponsePlan | MisinformationAnalysis }> = ({ data }) => {
  // Type guard to check which kind of data we have
  if ('planTitle' in data) {
    return <ResponsePlanView data={data} />;
  }
  
  if ('overallAssessment' in data) {
    return <MisinformationView data={data} />;
  }

  // Fallback if data structure is unexpected
  return (
    <div className="my-8 p-4 bg-yellow-900/50 border border-yellow-700 text-yellow-300 rounded-lg text-center">
      <p>Could not determine the type of analysis result.</p>
    </div>
  );
};

export default ResultDashboard;
