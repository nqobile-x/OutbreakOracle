
import React from 'react';

interface InputPanelProps {
  userInput: string;
  setUserInput: (value: string) => void;
  onAnalyze: () => void;
  loading: boolean;
  label: string;
  buttonText: string;
}

const InputPanel: React.FC<InputPanelProps> = ({ userInput, setUserInput, onAnalyze, loading, label, buttonText }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 shadow-lg border border-slate-700">
      <label htmlFor="scenario-input" className="block text-lg font-medium text-slate-300 mb-2">
        {label}
      </label>
      <textarea
        id="scenario-input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Provide the content you want to analyze..."
        className="w-full h-[40rem] p-4 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 resize-y text-slate-200"
        disabled={loading}
      />
      <div className="mt-4 flex justify-end">
        <button
          onClick={onAnalyze}
          disabled={loading || !userInput.trim()}
          className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        >
          {loading ? 'Analyzing...' : buttonText}
        </button>
      </div>
    </div>
  );
};

export default InputPanel;
