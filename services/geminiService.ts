
import { GoogleGenAI, Type } from '@google/genai';
import { ResponsePlan, MisinformationAnalysis } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RESPONSE_PLAN_SYSTEM_INSTRUCTION = `You are OutbreakOracle, an AI epidemiologist and public health strategist. Your task is to create a comprehensive, actionable outbreak response plan based on the provided details.

The plan must be structured into four distinct phases:
1.  **IMMEDIATE ACTIONS (0-72 hours)**
2.  **SHORT-TERM STRATEGY (1-4 weeks)**
3.  **MEDIUM-TERM PLAN (1-3 months)**
4.  **RECOVERY PHASE**

For each action within these phases, you must provide a brief, clear description of the action and its implementation details.

Crucially, you must also assess each action against four priority factors. For each factor, provide a rating (e.g., 'High', 'Medium', 'Low') or a concise rationale:
-   **Lives Saved**: The potential impact on reducing mortality and morbidity.
-   **Economic Impact**: The potential cost or disruption to the economy (where 'Low' is a positive attribute, meaning low disruption).
-   **Implementation Feasibility**: The practical difficulty of implementing the action given typical resource constraints.
-   **Public Compliance Likelihood**: The likelihood of the public adhering to the measure.

Your output must be a single, valid JSON object that strictly adheres to the provided schema. Do not include any markdown formatting, comments, or other text outside of the JSON object.`;

const RESPONSE_PLAN_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    planTitle: { type: Type.STRING, description: "A concise title for the response plan, e.g., 'Comprehensive Response Plan for [Disease] in [Location]'" },
    disease: { type: Type.STRING },
    location: { type: Type.STRING },
    planPhases: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, enum: ["IMMEDIATE ACTIONS (0-72 hours)", "SHORT-TERM STRATEGY (1-4 weeks)", "MEDIUM-TERM PLAN (1-3 months)", "RECOVERY PHASE"] },
          actions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                action: { type: Type.STRING, description: "The name of the intervention, e.g., 'Scale-up Testing'." },
                details: { type: Type.STRING, description: "Specific details and protocols for the action." },
                priorityFactors: {
                  type: Type.OBJECT,
                  properties: {
                    livesSaved: { type: Type.STRING, description: "Assessment of impact on saving lives (e.g., High, Medium, Low)." },
                    economicImpact: { type: Type.STRING, description: "Assessment of economic disruption (e.g., High, Medium, Low)." },
                    feasibility: { type: Type.STRING, description: "Assessment of implementation difficulty (e.g., High, Medium, Low)." },
                    publicCompliance: { type: Type.STRING, description: "Assessment of likely public compliance (e.g., High, Medium, Low)." },
                  },
                  required: ["livesSaved", "economicImpact", "feasibility", "publicCompliance"]
                }
              },
              required: ["action", "details", "priorityFactors"]
            }
          }
        },
        required: ["title", "actions"]
      }
    }
  },
  required: ["planTitle", "disease", "location", "planPhases"]
};

export const analyzeOutbreak = async (prompt: string): Promise<ResponsePlan> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        systemInstruction: RESPONSE_PLAN_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_PLAN_SCHEMA,
        temperature: 0.4,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as ResponsePlan;
  } catch (error) {
    console.error("Error calling Gemini API for Response Plan:", error);
    throw new Error("Failed to get a valid analysis from the AI model.");
  }
};


const MISINFORMATION_SYSTEM_INSTRUCTION = `You are an AI-powered misinformation detection specialist with expertise in public health and scientific communication. Your task is to analyze the provided text (e.g., news article, social media post) and produce a detailed assessment of its potential for being misinformation.

Your analysis must cover the following areas:
- **Overall Assessment**: A top-level classification of the content, your confidence in this assessment, and a concise summary.
- **Detailed Analysis**: A breakdown of the content's scientific accuracy, the credibility of its sources, and its level of sensationalism. For each, provide a rating and a brief justification.
- **Detected Signals**: A list of specific red flags or misinformation tactics observed in the text (e.g., "use of emotionally charged language," "appeals to authority with unverified experts," "promotion of a commercial product").
- **Public Health Impact**: A summary of the potential real-world consequences if this information were widely believed.

Your output must be a single, valid JSON object that strictly adheres to the provided schema. Do not include any markdown formatting, comments, or other text outside of the JSON object.`;

const MISINFORMATION_SCHEMA = {
    type: Type.OBJECT,
    properties: {
      overallAssessment: {
        type: Type.OBJECT,
        properties: {
          classification: { type: Type.STRING, enum: ['Accurate', 'Misleading', 'Fabricated', 'Satire'] },
          confidence: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
          summary: { type: Type.STRING, description: "A brief summary of the findings." }
        },
        required: ["classification", "confidence", "summary"]
      },
      detailedAnalysis: {
        type: Type.OBJECT,
        properties: {
          scientificAccuracy: {
            type: Type.OBJECT,
            properties: {
              rating: { type: Type.STRING, enum: ['High', 'Medium', 'Low', 'N/A'] },
              reasoning: { type: Type.STRING, description: "Justification for the scientific accuracy rating." }
            },
            required: ["rating", "reasoning"]
          },
          sourceCredibility: {
            type: Type.OBJECT,
            properties: {
              rating: { type: Type.STRING, enum: ['Credible', 'Questionable', 'Unverifiable'] },
              reasoning: { type: Type.STRING, description: "Justification for the source credibility rating." }
            },
            required: ["rating", "reasoning"]
          },
          sensationalism: {
            type: Type.OBJECT,
            properties: {
              rating: { type: Type.STRING, enum: ['Factual', 'Sensationalized', 'Alarmist'] },
              reasoning: { type: Type.STRING, description: "Justification for the sensationalism rating." }
            },
            required: ["rating", "reasoning"]
          }
        },
        required: ["scientificAccuracy", "sourceCredibility", "sensationalism"]
      },
      detectedSignals: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of specific misinformation tactics identified."
      },
      publicHealthImpact: {
        type: Type.STRING,
        description: "Potential impact on public health."
      }
    },
    required: ["overallAssessment", "detailedAnalysis", "detectedSignals", "publicHealthImpact"]
};


export const detectMisinformation = async (prompt: string): Promise<MisinformationAnalysis> => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
          systemInstruction: MISINFORMATION_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: MISINFORMATION_SCHEMA,
          temperature: 0.2,
        },
      });
  
      const jsonText = response.text.trim();
      const parsedJson = JSON.parse(jsonText);
      return parsedJson as MisinformationAnalysis;
    } catch (error) {
      console.error("Error calling Gemini API for Misinformation Detection:", error);
      throw new Error("Failed to get a valid analysis from the AI model.");
    }
  };
