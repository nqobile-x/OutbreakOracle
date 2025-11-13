
import React, { useState, useCallback } from 'react';
import { ResponsePlan, MisinformationAnalysis, AnalysisMode } from './types';
import { analyzeOutbreak, detectMisinformation } from './services/geminiService';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ResultDashboard from './components/ResultDashboard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

const DEFAULT_INPUTS: Record<AnalysisMode, string> = {
  responsePlan: `OUTBREAK RESPONSE PLAN GENERATOR

Outbreak details:
- Disease: Novel Coronavirus (nCoV-2)
- Location: Dense urban metropolis with major international airport.
- Confirmed cases: 150
- Days since first case: 10
- Transmission: Suspected respiratory droplet and fomite transmission.
- Severity: 15% hospitalization rate, 3% fatality rate among confirmed cases.

Available resources:
- Healthcare infrastructure: 5 major hospitals, at 85% capacity pre-outbreak.
- Stockpiled supplies: 500,000 surgical masks, 50,000 N95 respirators, 100 ventilators.
- Trained personnel: 50 epidemiologists, 200 public health nurses for contact tracing.
- Budget allocation: $10 million emergency fund.

Task: Create a comprehensive intervention plan.`,
  misinformation: `ARTICLE FOR ANALYSIS:

Title: "SHOCKING TRUTH: Doctors Stunned by this One Weird Trick to Cure Viruses Instantly!"

Content:
"Forget vaccines and doctors! Scientists at the 'Institute of Natural Holistics' have discovered that gargling with a special blend of lemon juice and cayenne pepper can eliminate any virus from your system in under an hour. This secret has been suppressed by big pharma for decades.

Dr. Anya Sharma, a supposed virologist quoted in a blog post, says 'This is the breakthrough we've been waiting for. It's 100% effective.' We found no record of a Dr. Sharma in any official medical registry.

The article urges readers to share this information widely to 'save lives' and includes a link to buy a 'Virus-Buster Elixir' for $99.99."`
};

const App: React.FC = () => {
  const [mode, setMode] = useState<AnalysisMode>('responsePlan');
  const [userInput, setUserInput] = useState<string>(DEFAULT_INPUTS.responsePlan);
  const [analysisResult, setAnalysisResult] = useState<ResponsePlan | MisinformationAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const switchMode = (newMode: AnalysisMode) => {
    if (loading) return;
    setMode(newMode);
    setUserInput(DEFAULT_INPUTS[newMode]);
    setAnalysisResult(null);
    setError(null);
  };

  const handleAnalyze = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Please provide content to analyze.');
      return;
    }
    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      let result;
      if (mode === 'responsePlan') {
        result = await analyzeOutbreak(userInput);
      } else {
        result = await detectMisinformation(userInput);
      }
      setAnalysisResult(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate the analysis. Please check the console for more details.');
    } finally {
      setLoading(false);
    }
  }, [userInput, mode]);
  
  const TABS: { key: AnalysisMode; label: string }[] = [
    { key: 'responsePlan', label: 'Response Plan Generator' },
    { key: 'misinformation', label: 'Misinformation Detector' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        <main className="mt-8">
          <div className="mb-6 flex border-b border-slate-700">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => switchMode(tab.key)}
                className={`px-4 py-3 text-sm sm:text-base font-semibold transition-colors duration-200 -mb-px border-b-2 ${
                  mode === tab.key
                    ? 'text-sky-400 border-sky-400'
                    : 'text-slate-400 border-transparent hover:text-sky-300 hover:border-slate-500'
                }`}
                disabled={loading}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <InputPanel
            userInput={userInput}
            setUserInput={setUserInput}
            onAnalyze={handleAnalyze}
            loading={loading}
            label={mode === 'responsePlan' ? 'Enter Outbreak & Resource Data' : 'Enter Article or Post for Analysis'}
            buttonText={mode === 'responsePlan' ? 'Generate Response Plan' : 'Analyze for Misinformation'}
          />

          {loading && <Loader text={mode === 'responsePlan' ? 'Generating Plan...' : 'Detecting Misinformation...'} />}
          {error && <ErrorMessage message={error} />}
          
          {analysisResult && (
            <div className="mt-8 animate-fade-in">
              <ResultDashboard data={analysisResult} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
