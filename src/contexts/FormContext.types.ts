import { createContext } from 'react';

export interface FormData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
  sleepDuration: string;
  smokingHabit: string;
  alcoholConsumption: string;
  familyHistory: string;
  existingConditions: string;
}

export interface PredictionResult {
  riskLevel: 'Low' | 'Medium' | 'High';
  healthScore: number;
  predictedDiseases: string[];
  suggestions: string[];
  bmi: number;
  bmiCategory: string;
  categoryScores: { name: string; score: number; level: 'Low' | 'Medium' | 'High' }[];
  timestamp: string;
}

export interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  predictions: PredictionResult[];
  predictionsLoading: boolean;
  predictionsError: string | null;
  reloadPredictions: () => Promise<void>;
  addPrediction: (result: PredictionResult) => Promise<boolean>;
}

export const defaultFormData: FormData = {
  age: '', gender: '', height: '', weight: '',
  activityLevel: '', sleepDuration: '',
  smokingHabit: '', alcoholConsumption: '',
  familyHistory: '', existingConditions: '',
};

export const FormContext = createContext<FormContextType | null>(null);
