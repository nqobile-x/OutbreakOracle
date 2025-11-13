
import React from 'react';
import { AlertLevel, OutbreakAnalysis } from '../types';

interface AlertHeaderProps {
  alertLevel: AlertLevel;
  riskScore: number;
  diseaseName: string;
  location: OutbreakAnalysis['location'];
}

const alertStyles: Record<AlertLevel, { bg: string, text: string, border: string }> = {
  [AlertLevel.CRITICAL]: { bg: 'bg-critical/20', text: 'text-critical', border: 'border-critical' },
  [AlertLevel.HIGH]: { bg: 'bg-high/20', text: 'text-high', border: 'border-high' },
  [AlertLevel.MODERATE]: { bg: 'bg-moderate/20', text: 'text-moderate', border: 'border-moderate' },
  [AlertLevel.LOW]: { bg: 'bg-low/20', text: 'text-low', border: 'border-low' },
  [AlertLevel.MINIMAL]: { bg: 'bg-minimal/20', text: 'text-minimal', border: 'border-minimal' },
};

const RiskScoreCircle: React.FC<{ score: number, color: string }> = ({ score, color }) => {
    const circumference = 2 * Math.PI * 52;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-32 h-32 sm:w-36 sm:h-36">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle className="text-slate-700" strokeWidth="10" stroke="currentColor" fill="transparent" r="52" cx="60" cy="60" />
                <circle
                    className={color}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                    transform="rotate(-90 60 60)"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl sm:text-4xl font-bold ${color}`}>{score}</span>
                <span className="text-xs text-slate-400">RISK SCORE</span>
            </div>
        </div>
    );
};


const AlertHeader: React.FC<AlertHeaderProps> = ({ alertLevel, riskScore, diseaseName, location }) => {
  const styles = alertStyles[alertLevel];

  return (
    <div className={`p-6 rounded-lg shadow-xl border-t-4 ${styles.bg} ${styles.border} flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8`}>
        <RiskScoreCircle score={riskScore} color={styles.text} />
        <div className="flex-1 text-center sm:text-left">
            <span className={`px-4 py-1 text-sm font-bold rounded-full ${styles.bg} ${styles.text} border ${styles.border}`}>
                ALERT LEVEL: {alertLevel}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-100">{diseaseName}</h2>
            <div className="mt-2 flex items-center justify-center sm:justify-start text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{location.region}, {location.country} ({location.coordinates})</span>
            </div>
        </div>
    </div>
  );
};

export default AlertHeader;
