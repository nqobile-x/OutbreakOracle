
export type AnalysisMode = 'responsePlan' | 'misinformation';

export interface MisinformationAnalysis {
  overallAssessment: {
    classification: 'Accurate' | 'Misleading' | 'Fabricated' | 'Satire';
    confidence: 'High' | 'Medium' | 'Low';
    summary: string;
  };
  detailedAnalysis: {
    scientificAccuracy: {
      rating: 'High' | 'Medium' | 'Low' | 'N/A';
      reasoning: string;
    };
    sourceCredibility: {
      rating: 'Credible' | 'Questionable' | 'Unverifiable';
      reasoning: string;
    };
    sensationalism: {
      rating: 'Factual' | 'Sensationalized' | 'Alarmist';
      reasoning: string;
    };
  };
  detectedSignals: string[];
  publicHealthImpact: string;
}


export interface ActionItem {
  action: string;
  details: string;
  priorityFactors: {
    livesSaved: string;
    economicImpact: string;
    feasibility: string;
    publicCompliance: string;
  };
}

export interface PlanPhase {
  title: "IMMEDIATE ACTIONS (0-72 hours)" | "SHORT-TERM STRATEGY (1-4 weeks)" | "MEDIUM-TERM PLAN (1-3 months)" | "RECOVERY PHASE";
  actions: ActionItem[];
}

export interface ResponsePlan {
  planTitle: string;
  disease: string;
  location: string;
  planPhases: PlanPhase[];
}

// NOTE: The types below are from a previous version of the application.
// They are not used by the current Response Plan Generator feature.
// They are kept to prevent compilation errors in unused component files.

export interface CaseProjections {
  bestCase: string;
  worstCase: string;
  likelyCase: string;
}

export interface Intervention {
  strategy: string;
  expectedOutcome: string;
}

export interface ResourceRequirements {
  ppe: string;
  medications: string;
  hospitalCapacity: string;
}

export interface TimeframePrediction {
  timeframe: "7 days" | "14 days" | "30 days" | "90 days";
  caseProjections: CaseProjections;
  geographicSpread: string[];
  healthcareStrain: string;
  economicImpact: string;
  interventions: Intervention[];
  resourceRequirements: ResourceRequirements;
}

export interface ScenarioAnalysis {
  disease: string;
  location: string;
  predictions: TimeframePrediction[];
}

export enum AlertLevel {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MODERATE = 'MODERATE',
  LOW = 'LOW',
  MINIMAL = 'MINIMAL',
}

export enum Priority {
  IMMEDIATE = 'IMMEDIATE',
  URGENT = 'URGENT',
  IMPORTANT = 'IMPORTANT',
}

export type SignalSource = "social media" | "news" | "search" | "hospital" | "weather";

export interface Signal {
  source: SignalSource;
  description: string;
  severity: string;
  timestamp: string;
}

export interface Recommendation {
  action: string;
  priority: Priority;
  targetAudience: string;
  timeframe: string;
}

export interface OutbreakAnalysis {
  alertLevel: AlertLevel;
  riskScore: number;
  diseaseName: string;
  location: {
    region: string;
    country: string;
    coordinates: string;
  };
  analysis: {
    transmissionRate: string;
    spreadVelocity: string;
    populationAtRisk: string;
    historicalComparison: string;
  };
  predictiveModel: {
    '7dayProjection': string;
    '30dayProjection': string;
    peakDate: string;
    affectedRegions: string[];
  };
  signals: Signal[];
  recommendations: Recommendation[];
}
