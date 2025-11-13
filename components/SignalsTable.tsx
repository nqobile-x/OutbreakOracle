
import React from 'react';
import { Signal } from '../types';
import { SocialMediaIcon, NewsIcon, SearchIcon, HospitalIcon, WeatherIcon } from './icons/SignalIcons';

interface SignalsTableProps {
  signals: Signal[];
}

const sourceIcons: Record<Signal['source'], React.ReactNode> = {
  "social media": <SocialMediaIcon />,
  "news": <NewsIcon />,
  "search": <SearchIcon />,
  "hospital": <HospitalIcon />,
  "weather": <WeatherIcon />,
};

const SignalsTable: React.FC<SignalsTableProps> = ({ signals }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg border border-slate-700 h-full">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Detected Signals</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-slate-600 text-sm text-slate-400">
            <tr>
              <th className="py-3 px-4 font-semibold">Source</th>
              <th className="py-3 px-4 font-semibold">Description</th>
              <th className="py-3 px-4 font-semibold">Severity</th>
              <th className="py-3 px-4 font-semibold">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {signals.map((signal, index) => (
              <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                <td className="py-4 px-4 align-top">
                  <div className="flex items-center space-x-2">
                    {sourceIcons[signal.source]}
                    <span className="capitalize">{signal.source}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-300 align-top">{signal.description}</td>
                <td className="py-4 px-4 align-top">
                  <span className="px-2 py-1 text-xs font-semibold bg-slate-700 rounded-full">{signal.severity}</span>
                </td>
                <td className="py-4 px-4 text-slate-400 align-top">{signal.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SignalsTable;
