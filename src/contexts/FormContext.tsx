import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

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

const defaultFormData: FormData = {
  age: '', gender: '', height: '', weight: '',
  activityLevel: '', sleepDuration: '',
  smokingHabit: '', alcoholConsumption: '',
  familyHistory: '', existingConditions: '',
};

interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  predictions: PredictionResult[];
  addPrediction: (result: PredictionResult) => void;
}

const FormContext = createContext<FormContextType | null>(null);

export const useFormData = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormData must be used within FormProvider');
  return ctx;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  useEffect(() => {
    localStorage.removeItem('health_predictions');
  }, []);

  const predictionStorageKey = useMemo(() => {
    const identity = user?.email?.toLowerCase() || 'guest';
    return `health_predictions:${identity}`;
  }, [user?.email]);

  const [predictions, setPredictions] = useState<PredictionResult[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(predictionStorageKey);
    setPredictions(stored ? (JSON.parse(stored) as PredictionResult[]) : []);
  }, [predictionStorageKey]);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const resetForm = () => setFormData(defaultFormData);

  const addPrediction = (result: PredictionResult) => {
    setPredictions((prev) => {
      const updated = [result, ...prev].slice(0, 10);
      localStorage.setItem(predictionStorageKey, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm, predictions, addPrediction }}>
      {children}
    </FormContext.Provider>
  );
};
